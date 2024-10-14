import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ItemsList from "../Components/ItemsList";
import { DataContext } from "../context/DataContext";
import { colorHelper } from "../Helper/colorHelper";
import { useTheme } from "../context/ThemeContext";
import { shapeHelper } from "../Helper/shapeHelper";

export default function Activities({ navigation }) {
  const { theme } = useTheme();

  function handleAddActivity() {
    navigation.navigate("Add An Activity");
  }


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleAddActivity} />,
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.mainPage,
  }
});
