import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './screens/HomePage';
import ProductListingPage from './screens/ProductListingPage';
import ProductDetailPage from './screens/ProductDetailPage';
import CartPage from './screens/CartPage';
import CheckoutPage from './screens/CheckoutPage';
import OrderConfirmationPage from './screens/OrderConfirmationPage';
import UserAccountPage from './screens/UserAccountPage';
import WishlistPage from './screens/WishlistPage';
import ContactUsPage from './screens/ContactUsPage';
import FAQPage from './screens/FAQPage';
import LoginRegisterPage from './screens/LoginRegisterPage';
import AdminDashboardPage from './screens/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login-register" element={<LoginRegisterPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
