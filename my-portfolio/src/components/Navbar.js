import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    } else {
      console.warn(`Section not found: ${sectionId}`);
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills-proficiency', label: 'Proficiency' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container container">
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="logo-text">Portfolio</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="navbar-links hide-mobile">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.id}
              className="nav-link"
              onClick={() => scrollToSection(link.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        <div className="navbar-actions">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-button hide-desktop"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-links">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  className="mobile-nav-link"
                  onClick={() => scrollToSection(link.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
