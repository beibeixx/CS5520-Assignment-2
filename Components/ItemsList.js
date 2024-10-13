import { StyleSheet, Text, View } from "react-native";
import React, { useContext }  from "react";
import { DataContext } from '../DataContext';


export default function ItemsList({ type }) {
  const { data } = useContext(DataContext);
  const filteredData = data[type];

  return (
    <FlatList
      data={filteredData}
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
