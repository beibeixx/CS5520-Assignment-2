import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorHelper } from '../colorHelper'

export default function Labels({children}) {
  return (
    <View>
      <Text style={styles.label}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
        color: colorHelper.background.primary,
      },
})