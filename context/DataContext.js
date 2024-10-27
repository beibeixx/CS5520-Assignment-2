/**
 * DataContext.js
 *
 * This module creates a DataContext and DataProvider to manage global state
 * for activities and diet entries across the application.
 */

import { StyleSheet } from "react-native";
import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [diets, setDiets] = useState([]);
  /**
   * Adds a new activity to the activities list
   * @param {Object} activity - oThe activity object to be added
   */
  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };
  /**
   * Adds a new diet entry to the diets list
   * @param {Object} diet - The diet entry object to be added
   */
  const addDiet = (diet) => {
    setDiets([...diets, diet]);
  };

  return (
    <DataContext.Provider value={{ activities, diets, addActivity, addDiet }}>
      {children}
    </DataContext.Provider>
  );
};

const styles = StyleSheet.create({});
