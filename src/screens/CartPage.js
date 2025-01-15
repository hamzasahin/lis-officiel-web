import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import CartSummary from '../components/CartSummary';
import CartItem from '../components/CartItem';
import './CartPage.css';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCartItems = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError('');

      console.log('Fetching cart items for user:', user.id);

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

      if (cartError) {
        console.error('Cart fetch error:', cartError);
        throw cartError;
      }

      console.log('Raw cart data:', cartData);

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
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = useCallback(async () => {
    try {
      setError('');
      if (!user) {
        setError('Please log in to add items to cart');
        return;
      }

      const productId = 'cbbf2096-ccf2-4408-a6eb-2eeeabbeb11e'; // Diamond Pendant
      console.log('Attempting to add product:', productId);

      // Check product availability
      const { data: products, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('is_active', true)
        .is('deleted_at', null)
        .limit(1);

      if (productError) {
        console.error('Product check error:', productError);
        throw productError;
      }

      const product = products?.[0];
      if (!product) {
        setError('Product is not available');
        return;
      }

      if (product.stock_quantity < 1) {
        setError('Product is out of stock');
        return;
      }

      // Check existing cart item
      const { data: cartItems, error: checkError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .is('deleted_at', null);

      if (checkError) {
        console.error('Check error:', checkError);
        throw checkError;
      }

      const existingItem = cartItems?.[0];

      if (existingItem) {
        // Update existing item
        const newQuantity = Math.min(10, existingItem.quantity + 1, product.stock_quantity);
        
        if (newQuantity === existingItem.quantity) {
          setError('Maximum quantity reached');
          return;
        }

        const { error: updateError } = await supabase
          .from('cart')
          .update({ 
            quantity: newQuantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id)
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }
      } else {
        // Insert new item
        const { error: insertError } = await supabase
          .from('cart')
          .insert([
            {
              user_id: user.id,
              product_id: productId,
              quantity: 1
            }
          ]);

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }
      }

      // Refresh cart items
      await fetchCartItems();
      setError('');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message || 'Failed to add item to cart');
    }
  }, [user, fetchCartItems]);

  const handleQuantityChange = useCallback(async (item, newQuantity) => {
    try {
      // Ensure newQuantity is a valid number
      const parsedQuantity = parseInt(newQuantity, 10);
      if (isNaN(parsedQuantity)) {
        setError('Please enter a valid quantity');
        return;
      }

      // Validate quantity limits
      const quantity = Math.max(1, Math.min(10, parsedQuantity));
      
      if (quantity === item.quantity) {
        return; // No change needed
      }

      console.log('Updating quantity for item:', item.id, 'to:', quantity);

      // Update the item
      const { data: updateData, error: updateError } = await supabase
        .from('cart')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', item.id)
        .eq('user_id', user.id) // Ensure we're only updating user's own items
        .is('deleted_at', null)
        .select();

      if (updateError) {
        console.error('Update error:', updateError);
        throw updateError;
      }

      // Update local state
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity }
            : cartItem
        )
      );

      // Clear any existing errors
      setError('');
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity');
    }
  }, [user]);

  const handleRemoveItem = useCallback(async (item) => {
    try {
      console.log('Removing item from cart:', item.id);

      // First mark the item as deleted
      const { error: deleteError } = await supabase
        .from('cart')
        .update({ 
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', item.id)
        .eq('user_id', user.id); // Ensure we're only updating user's own items

      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw deleteError;
      }

      // Update local state
      setCartItems(prevItems =>
        prevItems.filter(cartItem => cartItem.id !== item.id)
      );

      // Show success message
      setError('');
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item from cart');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="cart-page">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="item-count">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Test button for adding item */}
      <button onClick={addToCart} className="add-test-item">
        Add Diamond Pendant (Test)
      </button>

      {cartItems.length === 0 ? (
        <div className="cart-page empty">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          <div className="cart-sidebar">
            <CartSummary items={cartItems} />
            <div className="cart-actions">
              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
