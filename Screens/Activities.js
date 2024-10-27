/**
 * Activities.js
 *
 * This component displays the list of activities and provides
 * functionality to add new activities.
 */
import { StyleSheet, View, Button } from "react-native";
import React, { useEffect } from "react";
import ItemsList from "../Components/ItemsList";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Activities({ navigation }) {
  const { theme } = useTheme();
  /**
   * Handles navigation to the "Add An Activity" screen
   */
  function handleModifyActivities() {
    navigation.navigate("Modify Activity");
  }

  // Set up the "Add" button in the navigation header

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          onPress={handleModifyActivities}
          componentStyle={styles.icon}
        >
          <Ionicons name="add-outline" size={24} color="white" />
          <FontAwesome5 name="running" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Render the list of activities */}

      <ItemsList type="activities" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.mainPage,
  },
  icon: {
    flexDirection: "row",
    gap: 2,
  },
});
