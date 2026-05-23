import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Animate progress from 0 to 100 over 2.5 seconds
    const duration = 2500;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          // Call onComplete after a short delay to show 100%
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tiger Logo - Replace with actual logo image */}
              <div className="logo-placeholder">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="60" cy="60" r="50" stroke="var(--accent)" strokeWidth="4" />
                  <text
                    x="60"
                    y="70"
                    textAnchor="middle"
                    fill="var(--accent)"
                    fontSize="24"
                    fontWeight="bold"
                  >
                    AT
                  </text>
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="loading-progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="progress-bar-container">
                <motion.div
                  className="progress-bar"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.p
                className="progress-text"
                key={Math.floor(progress)}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {Math.floor(progress)}%
              </motion.p>
            </motion.div>

            <motion.p
              className="loading-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Loading ...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
