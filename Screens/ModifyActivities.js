/**
 * ModifyActivities.js
 *
 * This component provides a form for adding new activities,
 * including activity type, duration, and date.
 */
import { StyleSheet, View, Alert, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorHelper } from "../Helper/colorHelper";
import { useTheme } from "../context/ThemeContext";
import Inputs from "../Components/Inputs";
import Labels from "../Components/Labels";
import ButtonSet from "../Components/ButtonSet";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import { updateInDB, writeToDB } from "../Firebase/firestoreHelper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Checkbox from "expo-checkbox";

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

export default function ModifyActivities({ navigation, route }) {
  const isEditMode = route.params?.activity !== undefined;
  const currentActivity = route.params?.activity || null;

  const [open, setOpen] = useState(false);
  const [activType, setActivType] = useState(currentActivity?.title || null);
  const [duration, setDuration] = useState(
    currentActivity?.duration.toString() || ""
  );
  const [date, setDate] = useState(
    currentActivity ? new Date(currentActivity.date) : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit" : "Add An Activity",
      headerRight: isEditMode
        ? () => (
            <PressableButton onPress={handleDelete}>
              <FontAwesome5 name="trash" size={24} color="white" />
            </PressableButton>
          )
        : undefined,
    });
  }, [isEditMode]);

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
      ((activType === "Running" || activType === "Weights") &&
      durationNum > 60 ) &&
      (isEditMode ? !isChecked : true);

    // Create new activity object
    const newActivity = {
      // id: Date.now(),
      title: activType,
      type: "activities",
      duration: durationNum,
      date: date.toISOString(),
      isSpecial,
      updateAt: new Date().toISOString(),
    };
    // Add new /update the activity and navigate back
    isEditMode ? updateInDB(newActivity, currentActivity.id, "activities") : writeToDB(newActivity, "activities");
    navigation.goBack();
  };

  function handleDelete() {}

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

      {isEditMode && currentActivity.isSpecial && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
          />
          <Text style={styles.checkboxText}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
        </View>
      )}

      <ButtonSet>
        <PressableButton
          title="Cancel"
          onPress={() => navigation.goBack()}
          componentStyle={styles.cancelButton}
        />
        <PressableButton
          title="Save"
          onPress={handleSave}
          componentStyle={styles.saveButton}
        />
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
    flex: 1,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colorHelper.button.save,
  },
  checkboxContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    gap: 8,
  },
  checkboxText:{
    paddingRight: 10,
  },
});
