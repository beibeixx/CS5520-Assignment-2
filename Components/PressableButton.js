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
      <Text style={styles.text}>{title || children}</Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // flex:1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

text: {
  color: colorHelper.button.text,
},
  pressedStyle: {
    // backgroundColor: '#1976D2',
  },

});
