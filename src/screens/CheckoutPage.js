import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../contexts/supabase';
import { PaymentService } from '../services/PaymentService';
import { TaxService } from '../services/TaxService';
import { CouponService } from '../services/CouponService';
import './CheckoutPage.css';

// Checkout steps components
const ShippingForm = ({ onNext, shippingDetails, setShippingDetails }) => (
  <div className="checkout-step">
    <h2>Shipping Information</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      onNext();
    }}>
      <div className="form-group">
        <input
          type="text"
          placeholder="First Name"
          value={shippingDetails.firstName}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            firstName: e.target.value
          })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Last Name"
          value={shippingDetails.lastName}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            lastName: e.target.value
          })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Street Address"
          value={shippingDetails.street}
          onChange={(e) => setShippingDetails({
            ...shippingDetails,
            street: e.target.value
          })}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            value={shippingDetails.city}
            onChange={(e) => setShippingDetails({
              ...shippingDetails,
              city: e.target.value
            })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="State"
            value={shippingDetails.state}
            onChange={(e) => setShippingDetails({
              ...shippingDetails,
              state: e.target.value
            })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            placeholder="Postal Code"
            value={shippingDetails.postalCode}
            onChange={(e) => setShippingDetails({
              ...shippingDetails,
              postalCode: e.target.value
            })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            value={shippingDetails.country}
            onChange={(e) => setShippingDetails({
              ...shippingDetails,
              country: e.target.value
            })}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn-next">Continue to Payment</button>
    </form>
  </div>
);

const PaymentForm = ({ onNext, onBack, paymentDetails, setPaymentDetails }) => {
  const [cardType, setCardType] = useState('unknown');
  const [formattedCardNumber, setFormattedCardNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(PaymentService.PAYMENT_METHODS.CREDIT_CARD);

  const handleCardNumberChange = (e) => {
    const formatted = PaymentService.formatCardNumber(e.target.value);
    setFormattedCardNumber(formatted);
    setCardType(PaymentService.getCardType(e.target.value));
    setPaymentDetails({
      ...paymentDetails,
      method: PaymentService.PAYMENT_METHODS.CREDIT_CARD,
      cardNumber: e.target.value.replace(/\D/g, '')
    });
  };

  return (
    <div className="checkout-step">
      <h2>Payment Information</h2>
      <div className="payment-method-selector">
        <button
          className={`method-button ${paymentMethod === PaymentService.PAYMENT_METHODS.CREDIT_CARD ? 'active' : ''}`}
          onClick={() => setPaymentMethod(PaymentService.PAYMENT_METHODS.CREDIT_CARD)}
        >
          Credit Card
        </button>
        <button
          className={`method-button ${paymentMethod === PaymentService.PAYMENT_METHODS.PAYPAL ? 'active' : ''}`}
          onClick={() => setPaymentMethod(PaymentService.PAYMENT_METHODS.PAYPAL)}
        >
          PayPal
        </button>
      </div>

      {paymentMethod === PaymentService.PAYMENT_METHODS.CREDIT_CARD ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}>
          <div className="form-group">
            <div className={`card-input ${cardType}`}>
              <input
                type="text"
                placeholder="Card Number"
                value={formattedCardNumber}
                onChange={handleCardNumberChange}
                maxLength="19"
                required
              />
              {cardType !== 'unknown' && (
                <span className={`card-type-icon ${cardType}`} />
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentDetails.expiry}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  method: PaymentService.PAYMENT_METHODS.CREDIT_CARD,
                  expiry: e.target.value
                })}
                maxLength="5"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  method: PaymentService.PAYMENT_METHODS.CREDIT_CARD,
                  cvv: e.target.value.replace(/\D/g, '')
                })}
                maxLength="4"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name on Card"
              value={paymentDetails.nameOnCard}
              onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                method: PaymentService.PAYMENT_METHODS.CREDIT_CARD,
                nameOnCard: e.target.value
              })}
              required
            />
          </div>
          <div className="button-group">
            <button type="button" className="btn-back" onClick={onBack}>
              Back to Shipping
            </button>
            <button type="submit" className="btn-next">
              Review Order
            </button>
          </div>
        </form>
      ) : (
        <div className="paypal-container">
          <div id="paypal-button-container"></div>
          <div className="button-group">
            <button type="button" className="btn-back" onClick={onBack}>
              Back to Shipping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewOrder = ({ onBack, onConfirm, shippingDetails, cartItems, loading, taxDetails, couponDetails }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1000 ? 0 : 25;
  const discount = couponDetails?.discountAmount || 0;
  const afterDiscount = subtotal - discount;
  const tax = taxDetails?.totalTax || (afterDiscount * 0.08);
  const total = afterDiscount + shipping + tax;

  return (
    <div className="checkout-step">
      <h2>Review Order</h2>
      <div className="review-section">
        <h3>Shipping To</h3>
        <p>
          {shippingDetails.firstName} {shippingDetails.lastName}<br />
          {shippingDetails.street}<br />
          {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}<br />
          {shippingDetails.country}
        </p>
      </div>
      <div className="review-section">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} className="review-item">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
            {taxDetails?.calculationMethod === 'api' && (
              <span className="tax-note">*Based on your location</span>
            )}
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="button-group">
        <button type="button" className="btn-back" onClick={onBack}>
          Back to Payment
        </button>
        <button 
          type="button" 
          className="btn-confirm" 
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm Order'}
        </button>
      </div>
    </div>
  );
};

const CouponForm = ({ onApply, loading, error }) => {
  const [code, setCode] = useState('');

  return (
    <div className="coupon-form">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
      />
      <button
        onClick={() => onApply(code)}
        disabled={loading || !code}
      >
        {loading ? 'Applying...' : 'Apply'}
      </button>
      {error && <div className="coupon-error">{error}</div>}
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [taxDetails, setTaxDetails] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [couponError, setCouponError] = useState('');
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: cartData, error: cartError } = await supabase
          .from('cart')
          .select(`
            id,
            quantity,
            product_id,
            products!inner (
              id,
              name,
              base_price,
              sale_price,
              stock_quantity
            )
          `)
          .eq('user_id', user.id)
          .is('deleted_at', null);

        if (cartError) throw cartError;

        setCartItems(cartData.map(item => ({
          id: item.id,
          productId: item.product_id,
          name: item.products.name,
          price: item.products.sale_price || item.products.base_price,
          quantity: item.quantity,
          stockQuantity: item.products.stock_quantity
        })));
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Failed to load cart items');
      }
    };

    fetchCartItems();
  }, [user, navigate]);

  useEffect(() => {
    // Calculate tax whenever shipping details or cart items change
    const calculateTax = async () => {
      if (shippingDetails.state && cartItems.length > 0) {
        try {
          const taxInfo = await TaxService.calculateTax({
            items: cartItems,
            shipping: shippingDetails
          });
          setTaxDetails(taxInfo);
        } catch (error) {
          console.error('Error calculating tax:', error);
        }
      }
    };

    calculateTax();
  }, [cartItems, shippingDetails]);

  const handleApplyCoupon = async (code) => {
    setLoading(true);
    setCouponError('');

    try {
      const result = await CouponService.applyCoupon(code, {
        userId: user.id,
        items: cartItems,
        subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      });

      if (result.success) {
        setCouponDetails(result);
      } else {
        setCouponError(result.error);
      }
    } catch (error) {
      setCouponError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError('');

    try {
      // Process payment first
      const paymentResult = await PaymentService.processPayment(paymentDetails, {
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: shippingDetails,
        userId: user.id
      });

      if (!paymentResult.success) {
        throw new Error('Payment failed');
      }

      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            shipping_address: shippingDetails,
            status: 'pending',
            total_amount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            payment_intent_id: paymentResult.paymentId
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Apply coupon if used
      if (couponDetails) {
        const { error: couponError } = await supabase
          .from('applied_coupons')
          .insert([
            {
              order_id: orderData.id,
              user_id: user.id,
              coupon_code: couponDetails.coupon.code,
              discount_amount: couponDetails.discountAmount
            }
          ]);

        if (couponError) throw couponError;
      }

      // Mark cart items as deleted
      const { error: cartError } = await supabase
        .from('cart')
        .update({ deleted_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .is('deleted_at', null);

      if (cartError) throw cartError;

      // Navigate to success page
      navigate('/order-confirmation', { 
        state: { 
          orderId: orderData.id,
          orderDetails: {
            items: cartItems,
            shipping: shippingDetails,
            payment: {
              last4: paymentDetails.cardNumber.slice(-4),
              cardType: PaymentService.getCardType(paymentDetails.cardNumber)
            },
            coupon: couponDetails,
            tax: taxDetails,
            total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        }
      });
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message || 'Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="checkout-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          Shipping
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          Payment
        </div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          Review
        </div>
      </div>

      {step === 1 && (
        <ShippingForm
          onNext={() => setStep(2)}
          shippingDetails={shippingDetails}
          setShippingDetails={setShippingDetails}
        />
      )}

      {step === 2 && (
        <PaymentForm
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
        />
      )}

      {step === 3 && (
        <>
          <CouponForm
            onApply={handleApplyCoupon}
            loading={loading}
            error={couponError}
          />
          <ReviewOrder
            onBack={() => setStep(2)}
            onConfirm={handleConfirmOrder}
            shippingDetails={shippingDetails}
            cartItems={cartItems}
            loading={loading}
            taxDetails={taxDetails}
            couponDetails={couponDetails}
          />
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
