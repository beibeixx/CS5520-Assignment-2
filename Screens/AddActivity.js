import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DataContext } from "../DataContext";
import DropDownPicker from "react-native-dropdown-picker";

const activityTypes = [
  { label: "Walking", value: "Walking" },
  { label: "Running", value: "Running" },
  { label: "Swimming", value: "Swimming" },
  { label: "Weights", value: "Weights" },
  { label: "Yoga", value: "Yoga" },
  { label: "Cycling", value: "Cycling" },
  { label: "Hiking", value: "Hiking" },
];

export default function AddActivity({ navigation }) {
    const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);


  return (
    <View style={styles.container}>
      <Text>Activity Type:</Text>
      <DropDownPicker
        open={open}
        value={type}
        items={activityTypes}
        setOpen={setOpen}
        setValue={setType}
        style={styles.dropdown}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
