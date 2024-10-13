import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'
 
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const addDietEntry = (entry) => {
    setDietEntries([...dietEntries, entry]);
  };

  return (
    <DataContext.Provider value={{ activities, dietEntries, addActivity, addDietEntry }}>
      {children}
    </DataContext.Provider>
  );
};

const styles = StyleSheet.create({})