import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ItemsList from "../Components/ItemsList";
import { DataContext } from "../context/DataContext";
import { colorHelper } from "../colorHelper";
import { useTheme } from "../context/ThemeContext";

export default function Diet({ navigation }) {
  const { theme } = useTheme();

  function handleAddDiet() {
    navigation.navigate("Add A Diet Entry");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleAddDiet} />,
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ItemsList type="diet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
