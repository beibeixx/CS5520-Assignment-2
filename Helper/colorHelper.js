/**
 * colorHelper.js
 *
 * This module exports a colorHelper object that defines a color palette
 * for consistent use throughout the application.
 */

export const colorHelper = {
  // Background colors
  background: {
    primary: "#363678", // Primary background color, used for main elements
    page: "#AAA9C8", // Page background color
    pageChange: "#605D93", // Alternative page background color, possibly for state changes
    input: "#DDDDDD", // Background color for input fields
  },

  // Text colors
  text: {
    header: "#ffffff", // Color for header text
    selected: "#F7BB0D", // Color for selected text or elements
    unselected: "#8E8E8F", // Color for unselected text or elements
    updateSpecial: "#363678",

  },
  button: {
    cancel: "#9B0A5B", // Color for cancel button
    save: "#363678", // Color for save button
    text: "#ffffff",
  },
};