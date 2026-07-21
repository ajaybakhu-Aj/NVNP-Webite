import React from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, theme: C } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-sidebar-toggle group relative flex items-center justify-center gap-2 p-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: isDarkMode ? '#1e2117' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#434938' : '#e5e7eb'}`,
        color: isDarkMode ? '#94da32' : '#000000',
        boxShadow: `0 8px 20px rgba(0,0,0,0.15)`,
        width: '44px',
        height: '44px',
        margin: '8px 0',
        overflow: 'visible'
      }}
      aria-label="Toggle theme"
    >
      {/* Tooltip for layman understanding */}
      <span 
        className="absolute right-full mr-4 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundColor: isDarkMode ? '#94da32' : '#000000',
          color: isDarkMode ? '#000000' : '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        {isDarkMode ? "SWITCH TO LIGHT THEME" : "SWITCH TO DARK THEME"}
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ y: -10, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
