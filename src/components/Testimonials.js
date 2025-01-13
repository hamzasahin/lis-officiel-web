import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: 'I absolutely love my Lis Officiel jewelry! The quality is amazing and the designs are so unique.',
      author: 'Jessica M.',
    },
    {
      id: 2,
      text: 'I get so many compliments whenever I wear my Lis Officiel pieces. They are definitely a staple in my jewelry collection.',
      author: 'Emily T.',
    },
    {
      id: 3,
      text: 'I have purchased several pieces from Lis Officiel and they never disappoint. Their customer service is also excellent.',
      author: 'Rachel S.',
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-item">
            <p>{testimonial.text}</p>
            <span>- {testimonial.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
