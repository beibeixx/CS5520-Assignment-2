import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ItemsList from "../Components/ItemsList";
import { DataContext } from "../DataContext";

export default function Activities({ navigation }) {
  const { addActivity } = useContext(DataContext);

  const handleAddActivity = () => {
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={handleAddActivity} />,
    });
  }, []);

  return (
    <View>
      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({});
