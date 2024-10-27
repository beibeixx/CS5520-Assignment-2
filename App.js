/**
 * App.js
 *
 * This is the main entry point of the application. It sets up the navigation
 * structure and wraps the app with necessary context providers.
 */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTab from "./MyTab";
import AddActivity from "./Screens/AddActivity";
import { colorHelper } from "./Helper/colorHelper";
import AddDiet from "./Screens/AddDiet";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  // Create a native stack navigator

  const Stack = createNativeStackNavigator();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Home Screen */}

          <Stack.Screen
            name="Home"
            component={MyTab}
            options={{
              headerShown: false,
            }}
          />
          {/* Add Activity Screen */}

          <Stack.Screen
            name="Add An Activity"
            component={AddActivity}
            options={({ route }) => ({
              headerStyle: {
                backgroundColor: colorHelper.background.primary,
              },
              headerTintColor: colorHelper.text.header,
              headerBackTitleVisible: false,
            })}
          />
          {/* Add Diet Entry Screen */}

          <Stack.Screen
            name="Add A Diet Entry"
            component={AddDiet}
            options={({ route }) => ({
              headerStyle: {
                backgroundColor: colorHelper.background.primary,
              },
              headerTintColor: colorHelper.text.header,
              headerBackTitleVisible: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
