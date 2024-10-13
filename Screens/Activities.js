import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ItemsList from "../Components/ItemsList";
import { DataContext } from "../DataContext";
import { colorHelper } from "../colorHelper";

export default function Activities({ navigation }) {
  const { addActivity } = useContext(DataContext);

  function handleAddActivity() {
    navigation.navigate("Add An Activity");
  }


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleAddActivity} />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colorHelper.background.page,
  }
});
