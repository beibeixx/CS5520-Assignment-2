import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Activities') {
            return <Feather name="activity" size={24} color="black" />
          } 
          if (route.name === 'Diet') {
            return <MaterialCommunityIcons name="food" size={24} color="black" />          
          }
        },
      })}
    >
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})