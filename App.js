import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTab from "./MyTab";
import { DataProvider } from "./DataContext";
import AddActivity from "./Screens/AddActivity";
import { colorHelper } from "./colorHelper";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({});
