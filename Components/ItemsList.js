import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext }  from "react";
import { DataContext } from '../DataContext';


export default function ItemsList({ type }) {
    const { activities, diets } = useContext(DataContext);

    const data = type === 'activities' ? activities : diets;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
