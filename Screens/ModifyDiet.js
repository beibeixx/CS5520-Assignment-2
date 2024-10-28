/**
 * AddDiet.js
 *
 * This component provides a form for adding new diet entries,
 * including description, calories, and date.
 */
import { StyleSheet, View, Alert, Text } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
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

export default function ModifyDiet({ navigation, route }) {
  const isEditMode = route.params?.diet !== undefined;
  const currentDiet = route.params?.diet || null;

  const [description, setDescription] = useState(
    currentDiet?.description || ""
  );
  const [calories, setCalories] = useState(
    currentDiet?.calories.toString() || ""
  );
  const [date, setDate] = useState(
    currentDiet ? new Date(currentDiet.date) : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit" : "Add A Diet Entry",
      headerRight: isEditMode
        ? () => (
            <PressableButton onPress={handleDelete} pressedStyle={styles.pressedDelete}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </PressableButton>
          )
        : undefined,
    });
  }, [isEditMode]);

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

    const isSpecial = caloriesNum > 800 && (isEditMode ? !isChecked : true);

    // Create new diet entry object
    const newDietEntry = {
      // id: Date.now(),
      description,
      calories: caloriesNum,
      date: date.toISOString(),
      isSpecial,
      type: "diet",
      updateAt: new Date().toISOString(),
    };

    // Add the new diet entry and navigate back
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
                  await updateInDB(newDietEntry, currentDiet.id, "diets");
                  navigation.goBack();
                } catch (error) {
                  console.error("Error saving data:", error);
                }
              },
            },
          ]
        )
      : [writeToDB(newDietEntry, "diets"), navigation.goBack()];
  };

  function handleDelete() {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await deleteFromDB(currentDiet.id, "diets");
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

      <View style={styles.bottomContainer}>
        {isEditMode && currentDiet.isSpecial && (
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>
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
});
