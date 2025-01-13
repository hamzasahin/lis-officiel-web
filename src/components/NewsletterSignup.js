import React, { useState } from 'react';
import './NewsletterSignup.css';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2 className="newsletter-title">
          <span className="title-main">Stay</span>
          <span className="title-accent">Connected</span>
        </h2>
        <p className="newsletter-description">
          Subscribe to our newsletter for exclusive offers, new arrivals, and styling inspiration
        </p>
        
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
