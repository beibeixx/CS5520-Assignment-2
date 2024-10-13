import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorHelper } from '../colorHelper';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colorHelper.background.page,
    },
  });
  