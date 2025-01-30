'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full bg-transparent transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          x: theme === 'dark' ? 32 : 0,
          y: theme === 'dark' ? -32 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-10 h-10 ${
            theme === 'light'
              ? 'text-yellow-500 filter drop-shadow-glow-light'
              : 'text-blue-300 filter drop-shadow-glow-dark'
          }`}
        >
          {theme === 'light' ? (
            <circle cx="12" cy="12" r="5" />
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
        </svg>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
