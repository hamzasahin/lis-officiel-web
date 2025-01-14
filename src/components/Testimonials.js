import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Fashion Blogger',
      quote: "The quality and craftsmanship of their pieces are unmatched. Every item I've purchased has become an instant favorite.",
      image: require('../assets/images/image4.jpg')
    },
    {
      id: 2,
      name: 'Emma Thompson',
      role: 'Interior Designer',
      quote: 'Their jewelry adds the perfect finishing touch to any outfit. The attention to detail is remarkable.',
      image: require('../assets/images/image5.jpg')
    },
    {
      id: 3,
      name: 'Julia Chen',
      role: 'Art Director',
      quote: 'I love how each piece tells a story. The designs are both timeless and contemporary.',
      image: require('../assets/images/model1.jpg')
    }
  ];

  return (
    <section className="testimonials">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-main">Client</span>
          <span className="title-accent">Stories</span>
        </h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-image">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <blockquote className="testimonial-quote">
              "{testimonial.quote}"
            </blockquote>
            <div className="testimonial-author">
              <h3 className="author-name">{testimonial.name}</h3>
              <p className="author-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
