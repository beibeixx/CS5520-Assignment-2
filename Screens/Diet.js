/**
 * Diet.js
 *
 * This component displays the list of diet entries and provides
 * functionality to add new diet entries.
 */

import { StyleSheet, View, Button } from "react-native";
import React, { useEffect } from "react";
import ItemsList from "../Components/ItemsList";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Diet({ navigation }) {
  const { theme } = useTheme();

  /**
   * Handles navigation to the "Add A Diet Entry" screen
   */
  function handleAddDiet() {
    navigation.navigate("Add A Diet Entry");
  }
  // Set up the "Add" button in the navigation header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPress={handleAddDiet} componentStyle={styles.icon}>
          <Ionicons name="add-outline" size={24} color="white" />
          <MaterialCommunityIcons name="food" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Render the list of diet entries */}
      <ItemsList type="diet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.mainPage,
  },
  icon: {
    flexDirection: 'row',
    gap: 2,
  }
});
