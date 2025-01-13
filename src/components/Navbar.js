import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Lis Officiel</Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/products">Shop</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
