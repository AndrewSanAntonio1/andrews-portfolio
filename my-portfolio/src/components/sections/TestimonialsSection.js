import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { testimonials } from '../../data/testimonials';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="container">
        <SectionTitle
          subtitle="What People Say"
          title="Testimonials"
        />

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="testimonial-card" hover={false}>
              <div className="quote-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="var(--accent)">
                  <path d="M10 20c0-5.523 4.477-10 10-10v5c-2.761 0-5 2.239-5 5s2.239 5 5 5v5c-5.523 0-10-4.477-10-10zm20 0c0-5.523 4.477-10 10-10v5c-2.761 0-5 2.239-5 5s2.239 5 5 5v5c-5.523 0-10-4.477-10-10z" transform="scale(0.5)" />
                </svg>
              </div>
              
              <p className="testimonial-text">{testimonial.text}</p>
              
              <div className="testimonial-author">
                <h4 className="author-name">{testimonial.author}</h4>
                {testimonial.role && (
                  <p className="author-role">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
