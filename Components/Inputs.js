/**
 * Inputs.js
 * 
 * This component renders a customized TextInput with consistent styling.
 * It accepts various props to control its behavior and appearance.
 */
import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { colorHelper } from "../Helper/colorHelper";
import { shapeHelper } from "../Helper/shapeHelper";

export default function Inputs({
  value,
  onChangeText,
  keyboardType,
  onFocus,
  onBlur,
}) {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: colorHelper.background.primary,
    padding: shapeHelper.padding.mainPage,
    marginBottom: 10,
    backgroundColor: colorHelper.background.input,
    borderRadius: shapeHelper.borderRadius.big,
  },
});
