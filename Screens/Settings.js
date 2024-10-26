/**
 * Settings.js
 *
 * This component displays the settings screen, currently featuring
 * a button to toggle between light and dark themes.
 */
import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";

export default function Settings() {
  const { toggleTheme, theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.buttonContainer}>
        {/* Button to toggle between light and dark themes */}
        <PressableButton title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.mainPage,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "40%",
  },
});
