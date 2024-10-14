import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ButtonSet({ children }) {
  return <View style={styles.buttonContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 200,
  },
});
