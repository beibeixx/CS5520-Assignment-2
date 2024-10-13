import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTab from './MyTab';

export default function App() {
  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={MyTab} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
