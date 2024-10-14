import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTab from "./MyTab";
import { DataProvider } from "./context/DataContext";
import AddActivity from "./Screens/AddActivity";
import { colorHelper } from "./colorHelper";
import AddDiet from "./Screens/AddDiet";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ThemeProvider>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={MyTab}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Add An Activity"
              component={AddActivity}
              options={({ route }) => ({
                headerStyle: {
                  backgroundColor: colorHelper.background.primary,
                },
                headerTintColor: colorHelper.text.header,
              })}
            />
            <Stack.Screen
              name="Add A Diet Entry"
              component={AddDiet}
              options={({ route }) => ({
                headerStyle: {
                  backgroundColor: colorHelper.background.primary,
                },
                headerTintColor: colorHelper.text.header,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
