import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "./Screens/Activities";
import Diet from "./Screens/Diet";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colorHelper } from "./colorHelper";

const Tab = createBottomTabNavigator();

export default function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "Activities") {
            return <FontAwesome5 name="running" size={24} color="black" />;
          }
          if (route.name === "Diet") {
            return (
              <MaterialCommunityIcons name="food" size={24} color="black" />
            );
          }
        },
        headerStyle: {
          backgroundColor: colorHelper.background.header,
        },
        headerTintColor: colorHelper.text.header,
      })}
    >
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
