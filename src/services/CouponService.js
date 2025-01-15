import { supabase } from '../contexts/supabase';

export class CouponService {
  static async validateCoupon(code, orderDetails) {
    try {
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error) throw error;
      if (!coupon) throw new Error('Invalid coupon code');

      // Check if coupon is expired
      if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
        throw new Error('Coupon has expired');
      }

      // Check minimum order amount
      if (coupon.minimum_order && orderDetails.subtotal < coupon.minimum_order) {
        throw new Error(`Order must be at least $${coupon.minimum_order} to use this coupon`);
      }

      // Check usage limit per user
      if (coupon.usage_limit_per_user) {
        const { data: usageCount, error: usageError } = await supabase
          .from('applied_coupons')
          .select('id', { count: 'exact' })
          .eq('coupon_code', code.toUpperCase())
          .eq('user_id', orderDetails.userId);

        if (usageError) throw usageError;
        
        if (usageCount >= coupon.usage_limit_per_user) {
          throw new Error('You have reached the usage limit for this coupon');
        }
      }

      // Check if products in cart are eligible
      if (coupon.eligible_product_ids && coupon.eligible_product_ids.length > 0) {
        const hasEligibleProduct = orderDetails.items.some(item => 
          coupon.eligible_product_ids.includes(item.productId)
        );
        
        if (!hasEligibleProduct) {
          throw new Error('This coupon is not valid for the items in your cart');
        }
      }

      return {
        isValid: true,
        coupon
      };
    } catch (error) {
      console.error('Coupon validation error:', error);
      return {
        isValid: false,
        error: error.message
      };
    }
  }

  static calculateDiscount(coupon, orderDetails) {
    const { items, subtotal } = orderDetails;
    let discount = 0;

    // Calculate discount based on type
    switch (coupon.discount_type) {
      case 'percentage':
        discount = subtotal * (coupon.discount_value / 100);
        break;

      case 'fixed':
        discount = coupon.discount_value;
        break;

      case 'product_specific':
        // Calculate discount only for eligible products
        discount = items.reduce((total, item) => {
          if (coupon.eligible_product_ids.includes(item.productId)) {
            return total + (
              coupon.discount_type === 'percentage' ?
                item.price * item.quantity * (coupon.discount_value / 100) :
                Math.min(coupon.discount_value, item.price * item.quantity)
            );
          }
          return total;
        }, 0);
        break;

      default:
        throw new Error('Invalid discount type');
    }

    // Apply maximum discount if specified
    if (coupon.maximum_discount && discount > coupon.maximum_discount) {
      discount = coupon.maximum_discount;
    }

    return {
      originalAmount: subtotal,
      discountAmount: discount,
      finalAmount: subtotal - discount
    };
  }

  static async applyCoupon(code, orderDetails) {
    try {
      // Validate coupon first
      const { isValid, coupon, error } = await this.validateCoupon(code, orderDetails);
      
      if (!isValid) {
        throw new Error(error);
      }

      // Calculate discount
      const discountDetails = this.calculateDiscount(coupon, orderDetails);

      // Record coupon usage
      const { error: usageError } = await supabase
        .from('applied_coupons')
        .insert([
          {
            order_id: orderDetails.orderId,
            user_id: orderDetails.userId,
            coupon_code: code.toUpperCase(),
            discount_amount: discountDetails.discountAmount
          }
        ]);

      if (usageError) throw usageError;

      return {
        success: true,
        ...discountDetails,
        coupon
      };
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  }

  static async removeCoupon(orderDetails) {
    try {
      const { error } = await supabase
        .from('applied_coupons')
        .delete()
        .eq('order_id', orderDetails.orderId);

      if (error) throw error;

      return {
        success: true
      };
    } catch (error) {
      console.error('Error removing coupon:', error);
      throw error;
    }
  }

  static async getAvailableCoupons(userId) {
    try {
      const { data: coupons, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter out coupons that the user has maxed out
      const { data: userCouponUsage, error: usageError } = await supabase
        .from('applied_coupons')
        .select('coupon_code, count')
        .eq('user_id', userId)
        .group_by('coupon_code');

      if (usageError) throw usageError;

      const usageMap = Object.fromEntries(
        userCouponUsage.map(usage => [usage.coupon_code, usage.count])
      );

      return coupons.filter(coupon => 
        !coupon.usage_limit_per_user || 
        !usageMap[coupon.code] ||
        usageMap[coupon.code] < coupon.usage_limit_per_user
      );
    } catch (error) {
      console.error('Error fetching available coupons:', error);
      throw error;
    }
  }
} 