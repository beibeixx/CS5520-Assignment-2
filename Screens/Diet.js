import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ItemsList from "../Components/ItemsList";
import { DataContext } from "../DataContext";
import { colorHelper } from "../colorHelper";

export default function Diet({ navigation }) {
  const { addDiet } = useContext(DataContext);

  const handleAddDiet = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleAddDiet} />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ItemsList type="diets" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colorHelper.background.page,
  },
});
