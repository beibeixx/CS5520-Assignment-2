import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { colorHelper } from "../Helper/colorHelper";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";

export default function Settings() {
  const { toggleTheme, theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.buttonContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
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
