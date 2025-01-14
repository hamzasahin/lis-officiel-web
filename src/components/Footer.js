import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">About Lis Officiel</h3>
          <p className="footer-description">
            We are a French-inspired jewelry brand that focuses on quality and affordability. 
            Our pieces are designed to make you feel confident and beautiful.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/care-guide">Jewelry Care</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <div className="contact-info">
            <p>
              <i className="fas fa-envelope"></i>
              <a href="mailto:info@lisofficiel.com">info@lisofficiel.com</a>
            </p>
            <p>
              <i className="fas fa-phone"></i>
              <a href="tel:1-800-123-4567">1-800-123-4567</a>
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              1234 Rue de la Paix, Paris, France
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-description">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Lis Officiel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
