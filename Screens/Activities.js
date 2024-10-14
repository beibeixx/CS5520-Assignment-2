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

export default function Activities({ navigation }) {
  const { theme } = useTheme();
  /**
   * Handles navigation to the "Add An Activity" screen
   */
  function handleAddActivity() {
    navigation.navigate("Add An Activity");
  }

  // Set up the "Add" button in the navigation header

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleAddActivity} />,
    });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Render the list of activities */}

      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.mainPage,
  },
});
