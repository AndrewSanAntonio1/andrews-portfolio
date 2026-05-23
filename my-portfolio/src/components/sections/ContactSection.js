import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { socialLinks, contactInfo } from '../../data/socialLinks';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <SectionTitle
          subtitle="Get In Touch"
          title="Let's Work Together"
        />

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-title">Let's talk about your project</h3>
            <p className="contact-description">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="contact-details">
              <a href={`mailto:${contactInfo.email}`} className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value">{contactInfo.email}</p>
                </div>
              </a>

              {contactInfo.phone && (
                <a href={`tel:${contactInfo.phone}`} className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">Phone</p>
                    <p className="contact-value">{contactInfo.phone}</p>
                  </div>
                </a>
              )}

              {contactInfo.location && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">Location</p>
                    <p className="contact-value">{contactInfo.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.platform}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-card">
              <h3 className="cta-title">Ready to start a project?</h3>
              <p className="cta-description">
                Let's create something amazing together. Drop me a message and
                I'll get back to you as soon as possible.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = `mailto:${contactInfo.email}`}
              >
                Send Me an Email
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
