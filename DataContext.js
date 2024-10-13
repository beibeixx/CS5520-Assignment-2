import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'
 
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [diets, setDiets] = useState([]);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const addDiet = (diet) => {
    setDiets([...diets, diet]);
  };

  return (
    <DataContext.Provider value={{ activities, dietEntries: diets, addActivity, addDiet }}>
      {children}
    </DataContext.Provider>
  );
};

const styles = StyleSheet.create({})