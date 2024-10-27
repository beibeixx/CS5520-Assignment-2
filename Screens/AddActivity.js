/**
 * AddActivity.js
 *
 * This component provides a form for adding new activities,
 * including activity type, duration, and date.
 */
import { StyleSheet, View, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorHelper } from "../Helper/colorHelper";
import { useTheme } from "../context/ThemeContext";
import Inputs from "../Components/Inputs";
import Labels from "../Components/Labels";
import ButtonSet from "../Components/ButtonSet";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import { writeToDB } from "../Firebase/firestoreHelper";
import { database } from "../Firebase/fireBaseSetup";


// Define available activity types
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

  /**
   * Handles saving the new activity
   */
  const handleSave = () => {
    if (!activType || !duration || !date) {
      Alert.alert("Invalid Input", "Please fill all the required fields");
      return;
    }
    const durationNum = parseInt(duration);
    if (!duration.match(/^\d+$/) || durationNum <= 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number");
      return;
    }

    const isSpecial =
      (activType === "Running" || activType === "Weights") && durationNum > 60;

    // Create new activity object
    const newActivity = {
      id: Date.now(),
      title: activType,
      type: "activities",
      duration: durationNum,
      date: date.toISOString(),
      isSpecial,
    };
    // Add the new activity and navigate back
    writeToDB(newActivity, "activities")
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
        onBlur={() => {
          setShowDatePicker(false);
          if (!date) {
            setDate(new Date());
          }
        }}
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
        <PressableButton title="Cancel" onPress={() => navigation.goBack()} componentStyle={styles.cancelButton}/>
        <PressableButton title="Save" onPress={handleSave} componentStyle={styles.saveButton} />
      </ButtonSet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: shapeHelper.padding.addPage,
  },
  dropdown: {
    backgroundColor: colorHelper.background.input,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: colorHelper.button.cancel,
  },
  saveButton: {
    backgroundColor: colorHelper.button.save,
  }
});
