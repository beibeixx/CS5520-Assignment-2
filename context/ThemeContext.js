/**
 * ThemeContext.js
 * 
 * This module creates a ThemeContext and ThemeProvider to manage the app's theme
 * across the application, allowing for easy toggling between light and dark modes.
 */
import React, { createContext, useState, useContext } from 'react'
import { colorHelper } from '../Helper/colorHelper';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isToggle, setIsToggle] = useState(false);

  const toggleTheme = () => {
    setIsToggle(prevMode => !prevMode);
  };

  const theme = {
    backgroundColor: isToggle ? colorHelper.background.pageChange : colorHelper.background.page,
    textColor: isToggle ? colorHelper.text.header : colorHelper.background.primary,
    borderColor: isToggle? colorHelper.text.header : colorHelper.background.primary,
  };

  return (
    <ThemeContext.Provider value={{ isToggle, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);