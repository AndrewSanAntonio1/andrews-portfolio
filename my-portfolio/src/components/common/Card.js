import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      className={`card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(255, 107, 53, 0.15)' } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
