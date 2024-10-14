import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useContext } from "react";
import { DataContext } from "../DataContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorHelper } from "../colorHelper";

export default function AddDiet({ navigation }) {
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    <View style={styles.container}>
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Calories *</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date *</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      input: {
        borderWidth: 1,
        borderColor: colorHelper.background.primary,
        padding: 10,
        marginBottom: 10,
        backgroundColor: colorHelper.background.input,
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
        color: colorHelper.background.primary,
      },

});
