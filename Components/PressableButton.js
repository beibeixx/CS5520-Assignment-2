import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colorHelper } from "../Helper/colorHelper";

export default function PressableButton({
  children,
  onPress,
  title,
  componentStyle,
  pressedStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        componentStyle,
        styles.button,
        pressed && styles.pressedStyle,
      ]}
      android_ripple={{
        color: colorHelper.background.pageChange,
        borderless: false,
      }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressedStyle: {
    // backgroundColor: '#1976D2',
  },
  pressedText: {
    color: "rgba(255, 255, 255, 0.8)",
  },
});
