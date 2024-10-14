import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { colorHelper } from '../colorHelper';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
    const { toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Button title="Toggle Theme" onPress={toggleTheme}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    //   backgroundColor: colorHelper.background.page,
    },
  });
  