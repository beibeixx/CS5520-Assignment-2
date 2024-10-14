import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorHelper } from "../colorHelper";
import { useTheme } from "../context/ThemeContext";
import Inputs from "../Components/Inputs";
import Labels from "../Components/Labels";

export default function AddDiet({ navigation }) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();

  const { addDiet } = useContext(DataContext);

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

    const newDietEntry = {
        id: Date.now(),
        description,
      calories: caloriesNum,
      date: date.toISOString(),
      isSpecial,
      type: 'diet',
    };

    addDiet(newDietEntry);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
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
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
});
