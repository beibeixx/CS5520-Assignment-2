/**
 * AddDiet.js
 *
 * This component provides a form for adding new diet entries,
 * including description, calories, and date.
 */
import { StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../context/ThemeContext";
import Inputs from "../Components/Inputs";
import Labels from "../Components/Labels";
import ButtonSet from "../Components/ButtonSet";
import { shapeHelper } from "../Helper/shapeHelper";
import PressableButton from "../Components/PressableButton";
import { colorHelper } from "../Helper/colorHelper";
import { writeToDB } from "../Firebase/firestoreHelper";

export default function AddDiet({ navigation }) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();

  /**
   * Handles saving the new diet entry
   */
  const handleSave = () => {
    if (!description.trim() || !calories.trim()) {
      Alert.alert("Invalid Input", "Please fill all fields");
      return;
    }

    const caloriesNum = parseInt(calories);
    if (isNaN(caloriesNum) || caloriesNum <= 0) {
      Alert.alert("Invalid Input", "Calories must be a positive number");
      return;
    }

    const isSpecial = caloriesNum > 800;

    // Create new diet entry object
    const newDietEntry = {
      id: Date.now(),
      description,
      calories: caloriesNum,
      date: date.toISOString(),
      isSpecial,
      type: "diet",
    };

    // Add the new diet entry and navigate back
    writeToDB(newDietEntry, "diets");

    navigation.goBack();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Labels>Description *</Labels>
      <Inputs
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Labels>Calories *</Labels>
      <Inputs
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
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
  cancelButton: {
    backgroundColor: colorHelper.button.cancel,
  },
  saveButton: {
    backgroundColor: colorHelper.button.save,
  },
});
