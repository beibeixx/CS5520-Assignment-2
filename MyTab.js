/**
 * MyTab.js
 *
 * This component sets up the bottom tab navigation for the app,
 * including the Activities, Diet, and Settings screens.
 */
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Activities from "./Screens/Activities";
import Diet from "./Screens/Diet";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colorHelper } from "./Helper/colorHelper";
import Settings from "./Screens/Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fontHelper } from "./Helper/fontHelper";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

export default function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure the tab bar icons
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Activities") {
            return <FontAwesome5 name="running" size={size} color={color} />;
          }
          if (route.name === "Diet") {
            return (
              <MaterialCommunityIcons name="food" size={size} color={color} />
            );
          }
          if (route.name === "Settings") {
            return <Ionicons name="settings-sharp" size={size} color={color} />;
          }
        },
        // Style the header
        headerStyle: {
          backgroundColor: colorHelper.background.primary,
        },
        headerTintColor: colorHelper.text.header,
        // Style the tab bar
        tabBarStyle: {
          backgroundColor: colorHelper.background.primary,
        },
        tabBarActiveTintColor: colorHelper.text.selected,
        tabBarInactiveTintColor: colorHelper.text.unselected,
        // Configure the tab bar labels
        tabBarLabel: ({ focused }) => {
          let color = focused
            ? colorHelper.text.selected
            : colorHelper.text.unselected;
          if (route.name === "Activities") {
            return <Text style={{ color, fontSize: fontHelper.size.tab }}>Activities</Text>;
          }
          if (route.name === "Diet") {
            return <Text style={{ color, fontSize: fontHelper.size.tab }}>Diet</Text>;
          }
          if (route.name === "Settings") {
            return <Text style={{ color, fontSize: fontHelper.size.tab }}>Settings</Text>;
          }
        },
      })}
    >
      {/* Define the tab screens */}
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
