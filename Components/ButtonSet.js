/**
 * ButtonSet.js
 * 
 * This component renders a container for buttons, allowing for 
 * consistent layout of multiple buttons in a row.
 */
import { StyleSheet, View } from "react-native";
import React from "react";

export default function ButtonSet({ children }) {
  return <View style={styles.buttonContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    padding: 15,
  },
});
