import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { colorHelper } from "../colorHelper";

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
    padding: 10,
    marginBottom: 10,
    backgroundColor: colorHelper.background.input,
    borderRadius: 10,
  },
});
