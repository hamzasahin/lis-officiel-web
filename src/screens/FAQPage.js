import React from 'react';
import FAQItem from '../components/FAQItem';

const FAQPage = () => {
  const faqs = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'You can place an order on our website by selecting the products you want and adding them to your cart. From there, you can proceed to checkout and enter your billing and shipping information.',
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.',
    },
    {
      id: 3,
      question: 'What is your return policy?',
      answer: 'If you are not satisfied with your purchase, you can return it within 30 days for a full refund. Please contact us for instructions on how to initiate a return.',
    },
    {
      id: 4,
      question: 'How can I track my order?',
      answer: 'Once your order has shipped, you will receive a tracking number by email. You can use this number to track your package on the carrier\'s website.',
    },
  ];

  return (
    <div className="faq-page">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQPage;
