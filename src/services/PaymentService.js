import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../contexts/supabase';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export class PaymentService {
  static PAYMENT_METHODS = {
    CREDIT_CARD: 'credit_card',
    PAYPAL: 'paypal'
  };

  static async initializePayPal() {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        resolve(window.paypal);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = () => resolve(window.paypal);
      script.onerror = () => reject(new Error('PayPal SDK could not be loaded'));
      document.body.appendChild(script);
    });
  }

  static async createPaymentIntent(orderDetails) {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: orderDetails.total * 100, // Convert to cents
          currency: 'usd',
          payment_method_types: ['card'],
          metadata: {
            order_id: orderDetails.orderId,
            user_id: orderDetails.userId,
            payment_method: orderDetails.paymentMethod
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  static async processPayment(paymentDetails, orderDetails) {
    try {
      switch (paymentDetails.method) {
        case this.PAYMENT_METHODS.CREDIT_CARD:
          return await this.processCreditCardPayment(paymentDetails, orderDetails);
        case this.PAYMENT_METHODS.PAYPAL:
          return await this.processPayPalPayment(paymentDetails, orderDetails);
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  static async processCreditCardPayment(paymentDetails, orderDetails) {
    try {
      // Validate card details
      if (!this.validateCardNumber(paymentDetails.cardNumber)) {
        throw new Error('Invalid card number');
      }

      const [expMonth, expYear] = paymentDetails.expiry.split('/');
      if (!this.validateExpiryDate(expMonth, expYear)) {
        throw new Error('Invalid expiry date');
      }

      if (!this.validateCVV(paymentDetails.cvv)) {
        throw new Error('Invalid CVV');
      }

      // Create payment intent
      const paymentIntent = await this.createPaymentIntent({
        ...orderDetails,
        paymentMethod: this.PAYMENT_METHODS.CREDIT_CARD
      });

      // Process with Stripe
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: {
            number: paymentDetails.cardNumber,
            exp_month: parseInt(expMonth),
            exp_year: parseInt(expYear),
            cvc: paymentDetails.cvv
          },
          billing_details: {
            name: paymentDetails.nameOnCard
          }
        }
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      return {
        success: true,
        paymentId: paymentIntent.id,
        method: this.PAYMENT_METHODS.CREDIT_CARD
      };
    } catch (error) {
      console.error('Credit card payment error:', error);
      throw error;
    }
  }

  static async processPayPalPayment(paymentDetails, orderDetails) {
    try {
      const paypal = await this.initializePayPal();
      
      return new Promise((resolve, reject) => {
        paypal.Buttons({
          createOrder: async () => {
            try {
              const { data, error } = await supabase.functions.invoke('create-paypal-order', {
                body: {
                  amount: orderDetails.total,
                  currency: 'USD',
                  userId: orderDetails.userId
                }
              });

              if (error) throw error;
              return data.orderID;
            } catch (error) {
              console.error('PayPal order creation error:', error);
              reject(error);
            }
          },
          onApprove: async (data) => {
            try {
              const { error } = await supabase.functions.invoke('capture-paypal-payment', {
                body: {
                  orderID: data.orderID,
                  userId: orderDetails.userId
                }
              });

              if (error) throw error;

              resolve({
                success: true,
                paymentId: data.orderID,
                method: this.PAYMENT_METHODS.PAYPAL
              });
            } catch (error) {
              console.error('PayPal capture error:', error);
              reject(error);
            }
          },
          onError: (error) => {
            console.error('PayPal error:', error);
            reject(error);
          }
        }).render(paymentDetails.paypalContainerId);
      });
    } catch (error) {
      console.error('PayPal payment error:', error);
      throw error;
    }
  }

  static validateCardNumber(cardNumber) {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    
    // Check if the number contains only digits
    if (!/^\d+$/.test(cleanNumber)) return false;
    
    // Luhn algorithm for card number validation
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost one
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return (sum % 10) === 0;
  }

  static validateExpiryDate(month, year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  }

  static validateCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
  }

  static formatCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  static getCardType(cardNumber) {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };

    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cleanNumber)) return type;
    }
    return 'unknown';
  }
} 