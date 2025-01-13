import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div>
        <h3>About Us</h3>
        <p>We are a French-inspired jewelry brand that focuses on quality and affordability. Our pieces are designed to make you feel confident and beautiful.</p>
      </div>
      <div>
        <h3>Contact Us</h3>
        <p>Email: info@lisofficiel.com</p>
        <p>Phone: 1-800-123-4567</p>
        <p>Address: 1234 Rue de la Paix, Paris, France</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
