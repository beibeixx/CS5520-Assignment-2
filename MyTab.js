import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';

const Tab = createBottomTabNavigator();

export default function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})