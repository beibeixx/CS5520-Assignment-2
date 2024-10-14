import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { fontHelper } from '../Helper/fontHelper';

export default function Labels({children}) {
    const { theme } = useTheme();

  return (
    <View>
      <Text style={[styles.label, {color: theme.textColor}]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    label: {
        fontSize: fontHelper.size.title,
        marginBottom: 5,
        fontWeight: fontHelper.style.bold,
      },
})