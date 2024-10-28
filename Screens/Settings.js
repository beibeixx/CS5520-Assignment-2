/**
 * Settings.js
 *
 * This component displays the settings screen, currently featuring
 * a button to toggle between light and dark themes.
 */
import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import { colorHelper } from "../Helper/colorHelper";

export default function Settings() {
  const { toggleTheme, theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.buttonContainer}>
        {/* Button to toggle between light and dark themes */}
        <PressableButton
          title="Toggle Theme"
          onPress={toggleTheme}
          componentStyle={styles.toggleButton}
          pressedStyle={styles.pressedStyle}
        />
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
    height: "9%",
  },
  toggleButton: {
    backgroundColor: colorHelper.background.primary,
  },
  pressedStyle: {
    transform: [{ scale: 1.02 }],
    borderColor: colorHelper.text.selected,
    borderWidth: 1.5,
  }
});
