import React from 'react';
// import { Switch } from 'react-router-dom';
// import Switch from 'react-router-dom/esm/Switch';
import { BrowserRouter as Switch, Router, Route } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={ProductListingPage} />
        <Route exact path="/products/:id" component={ProductDetailPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/order-confirmation" component={OrderConfirmationPage} />
        <Route exact path="/account" component={UserAccountPage} />
        <Route exact path="/wishlist" component={WishlistPage} />
        <Route exact path="/contact-us" component={ContactUsPage} />
        <Route exact path="/faq" component={FAQPage} />
        <Route exact path="/login-register" component={LoginRegisterPage} />
        <Route exact path="/admin" component={AdminDashboardPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
