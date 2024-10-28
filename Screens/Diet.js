/**
 * Diet.js
 *
 * This component displays the list of diet entries and provides
 * functionality to add new diet entries.
 */

import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import ItemsList from "../Components/ItemsList";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { mainStyle } from "../Components/CommonStyle";
import { fontHelper } from "../Helper/fontHelper";
import { colorHelper } from "../Helper/colorHelper";

export default function Diet({ navigation }) {
  const { theme } = useTheme();

  /**
   * Handles navigation to the "Add A Diet Entry" screen
   */
  function handleAddDiet() {
    navigation.navigate("Modify Diet");
  }
  // Set up the "Add" button in the navigation header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          onPress={handleAddDiet}
          componentStyle={styles.icon}
          pressedStyle={styles.pressIcon}
        >
          <Ionicons
            name="add-outline"
            size={fontHelper.size.icon}
            color={colorHelper.button.text}
          />
          <MaterialCommunityIcons
            name="food"
            size={fontHelper.size.icon}
            color={colorHelper.button.text}
          />
        </PressableButton>
      ),
    });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Render the list of diet entries */}
      <ItemsList type="diets" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  ...mainStyle,
});
