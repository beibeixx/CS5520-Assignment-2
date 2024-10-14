import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useContext } from 'react'
import { colorHelper } from '../colorHelper';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isToggle, setIsToggle] = useState(false);

  const toggleTheme = () => {
    setIsToggle(prevMode => !prevMode);
  };

  const theme = {
    backgroundColor: isToggle ? colorHelper.background.pageChange : colorHelper.background.page,
    textColor: isToggle ? colorHelper.text.header : colorHelper.background.primary,
  };

  return (
    <ThemeContext.Provider value={{ isToggle, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);