'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MoonStar, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-3 right-10 z-50 w-16 h-16 rounded-full bg-transparent transition-colors duration-200"
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
          className={`w-10 h-10 ${theme === 'light'
              ? 'filter drop-shadow-glow-light'
              : 'filter drop-shadow-glow-dark'
            }`}
        >
          {theme === 'light' ? (
            <Sun color="#f5c211" />
          ) : (
            <MoonStar />
          )}
        </svg>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
