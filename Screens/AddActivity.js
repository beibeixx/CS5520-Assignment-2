import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { DataContext } from "../DataContext";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorHelper } from "../colorHelper";

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
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addActivity } = useContext(DataContext);

  const handleSave = () => {
    if (!type || !duration || !date) {
      Alert.alert("Invalid Input", "Please fill all the required fields");
      return;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number");
      return;
    }

    const isSpecial =
      (type === "Running" || type === "Weights") && durationNum > 60;

    const newActivity = {
      id: Date.now(),
      type,
      duration: durationNum,
      date: date.toISOString(),
      isSpecial,
    };

    addActivity(newActivity);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Activity *</Text>
      <DropDownPicker
        open={open}
        value={type}
        items={activityTypes}
        setOpen={setOpen}
        setValue={setType}
        style={styles.dropdown}
        placeholder="Select an Activity"
      />
      <Text>Duration (min) *</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Date *</Text>
      <TextInput
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={styles.input}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colorHelper.background.page,
  },
  dropdown: {
    backgroundColor: colorHelper.background.input,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    backgroundColor: colorHelper.background.input,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
