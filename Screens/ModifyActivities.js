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
import PressableButton from "../Components/PressableButton";
import {
  deleteFromDB,
  updateInDB,
  writeToDB,
} from "../Firebase/firestoreHelper";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { modifyStyle } from "../Components/CommonStyle";
import { fontHelper } from "../Helper/fontHelper";

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

  // Add delete button for edit mode
  useEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit" : "Add An Activity",
      headerRight: isEditMode
        ? () => (
            <PressableButton
              onPress={handleDelete}
              pressedStyle={styles.pressedDelete}
            >
              <Ionicons
                name="trash-outline"
                size={fontHelper.size.icon}
                color={colorHelper.button.text}
              />
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
      (activType === "Running" || activType === "Weights") &&
      durationNum > 60 &&
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
    isEditMode
      ? Alert.alert(
          "Important",
          "Are you sure you want to save these changes?",
          [
            { text: "No" },
            {
              text: "Yes",
              onPress: async () => {
                try {
                  await updateInDB(
                    newActivity,
                    currentActivity.id,
                    "activities"
                  );
                  navigation.goBack();
                } catch (error) {
                  console.error("Error saving data:", error);
                }
              },
            },
          ]
        )
      : [writeToDB(newActivity, "activities"), navigation.goBack()];
  };

  function handleDelete() {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await deleteFromDB(currentActivity.id, "activities");
            navigation.goBack();
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        },
      },
    ]);
  }

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
        style={[styles.dropdown, { borderColor: theme.borderColor }]}
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

      <View style={styles.bottomContainer}>
        {isEditMode && currentActivity.isSpecial && (
          <View style={styles.checkboxContainer}>
            <Text style={[styles.checkboxText, { color: theme.textColor }]}>
              This item is marked as special. Select the checkbox if you would
              like to approve it.
            </Text>
            <Checkbox value={isChecked} onValueChange={setIsChecked} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  ...modifyStyle,
  dropdown: {
    backgroundColor: colorHelper.background.input,
    marginBottom: 10,
  },
});
