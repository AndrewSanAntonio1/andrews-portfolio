import React from 'react';
import { motion } from 'framer-motion';
import './SectionTitle.css';

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}) => {
  return (
    <motion.div 
      className={`section-title ${centered ? 'section-title-centered' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2 
        className="section-title-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
};

export default SectionTitle;
