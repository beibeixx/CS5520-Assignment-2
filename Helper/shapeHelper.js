/**
 * shapeHelper.js
 *
 * This module exports a shapeHelper object that defines consistent padding
 * and border radius values for use throughout the application.
 */

export const shapeHelper = {
  // Padding values for different page types and components
  padding: {
    mainPage: 10, // Padding for main pages
    addPage: 20, // Padding for add/edit pages
    listMain: 10, // Padding for the main list container
    listInside: 5, // Padding for items inside the list
  },

  // Border radius values for different sized elements
  borderRadius: {
    big: 10, // Large border radius
    mid: 5, // Medium border radius
    small: 2, // Small border radius
  },
};
