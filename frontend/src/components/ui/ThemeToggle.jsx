import React from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="global-social-btn btn-theme-toggle group relative flex items-center justify-center p-0 rounded-full cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: isDarkMode ? '#1e2117' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#434938' : '#e5e7eb'}`,
        color: isDarkMode ? '#94da32' : '#11140c',
        boxShadow: `0 2px 8px rgba(0,0,0,0.5)`,
      }}
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDarkMode ? <Sun size={13} /> : <Moon size={13} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
