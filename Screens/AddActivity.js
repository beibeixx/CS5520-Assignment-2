import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorHelper } from "../colorHelper";
import { useTheme } from "../context/ThemeContext";
import Inputs from "../Components/Inputs";
import Labels from "../Components/Labels";
import ButtonSet from "../Components/ButtonSet";

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
  const [activType, setActivType] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();

  const { addActivity } = useContext(DataContext);

  const handleSave = () => {
    if (!activType || !duration || !date) {
      Alert.alert("Invalid Input", "Please fill all the required fields");
      return;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number");
      return;
    }

    const isSpecial =
      (activType === "Running" || activType === "Weights") && durationNum > 60;

    const newActivity = {
      id: Date.now(),
      title: activType,
      type: "activities",
      duration: durationNum,
      date: date.toISOString(),
      isSpecial,
    };

    addActivity(newActivity);
    navigation.goBack();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Labels>Activity *</Labels>
      <DropDownPicker
        open={open}
        value={activType}
        items={activityTypes}
        setOpen={setOpen}
        setValue={setActivType}
        style={styles.dropdown}
        placeholder="Select an Activity"
      />
      <Labels>Duration (min) *</Labels>
      <Inputs
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <Labels>Date *</Labels>
      <Inputs
        value={date ? date.toDateString() : ""}
        onFocus={() => setShowDatePicker(true)}
        onBlur={() => setShowDatePicker(false)}
        style={styles.input}
      />
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <ButtonSet>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={handleSave} />
      </ButtonSet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
    backgroundColor: colorHelper.background.input,
    marginBottom: 10,
  },
});
