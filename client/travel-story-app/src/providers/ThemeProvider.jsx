// ThemeContext.js
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// Create a ThemeContext
const ThemeContext = createContext();

// ThemeProvider Component to wrap around the App
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div
        className={`${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);


ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};