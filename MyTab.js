import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "./Screens/Activities";
import Diet from "./Screens/Diet";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colorHelper } from "./colorHelper";

const Tab = createBottomTabNavigator();

export default function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Activities") {
            return <FontAwesome5 name="running" size={size} color={color} />;
          }
          if (route.name === "Diet") {
            return (
              <MaterialCommunityIcons name="food" size={size} color={color} />
            );
          }
        },
        headerStyle: {
          backgroundColor: colorHelper.background.primary,
        },
        headerTintColor: colorHelper.text.header,
        tabBarStyle: {
          backgroundColor: colorHelper.background.primary,
        },
        tabBarActiveTintColor: colorHelper.text.selected,
        tabBarInactiveTintColor: colorHelper.text.unselected,
        tabBarLabel: ({ focused }) => {
          let color = focused
            ? colorHelper.text.selected
            : colorHelper.text.unselected;
          if (route.name === "Activities") {
            return <Text style={{ color, fontSize: 12 }}>Activities</Text>;
          }
          if (route.name === "Diet") {
            return <Text style={{ color, fontSize: 12 }}>Diet</Text>;
          }
        },
      })}
    >
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
