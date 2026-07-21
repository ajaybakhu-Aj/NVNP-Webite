import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Dark theme (the original theme)
const darkTheme = {
  bg: "#11140c",
  surface: "#11140c",
  surfCont: "#1e2117",
  surfHi: "#282b21",
  surfHighest: "#33362c",
  surfLow: "#0c0f07",
  onSurf: "#e2e4d5",
  onSurfVar: "#c3c9b3",
  primary: "#deffa4",
  onPrimary: "#233600",
  secondary: "#94da32",
  outline: "#8d937f",
  outlineVar: "#434938",
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};

// Light theme (new)
const lightTheme = {
  bg: "#f9fafb", // very light gray/off-white background
  surface: "#ffffff", // pure white surface
  surfCont: "#f3f4f6", // slightly gray container
  surfHi: "#e5e7eb", // borders or elevated
  surfHighest: "#d1d5db", // high elevation or strong borders
  surfLow: "#f9fafb", 
  onSurf: "#111827", // almost black text
  onSurfVar: "#4b5563", // dark gray secondary text
  primary: "#4a6b00", // a darker variant of the original primary green for better contrast on white
  onPrimary: "#ffffff", // white text on primary background
  secondary: "#65a30d", // green secondary
  outline: "#9ca3af", // gray outline
  outlineVar: "#e5e7eb", // light gray outline
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('nv_theme');
    // Default to dark mode if nothing is saved
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('nv_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
