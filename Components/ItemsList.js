import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { colorHelper } from "../colorHelper";

export default function ItemsList({ type }) {
  const { activities, diets } = useContext(DataContext);

  const data = type === "activities" ? activities : diets;

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemTitle}>
              {type === "activities" ? item.title : item.description}
            </Text>
          </View>
          <View style={styles.itemRight}>
            {item.isSpecial && (
              <Ionicons
                name="warning"
                size={24}
                color={colorHelper.text.selected}
              />
            )}
            <View style={styles.itemDateContainer}>
              <Text style={styles.itemDate}>
                {new Date(item.date).toDateString()}
              </Text>
            </View>
            <View style={styles.itemDetailContainer}>
              <Text style={styles.itemDetail}>
                {type === "activities"
                  ? `${item.duration} min`
                  : `${item.calories}`}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorHelper.background.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  itemDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemDateContainer: {
    backgroundColor: colorHelper.text.header,
    padding: 5,
    marginRight: 5,
    borderRadius: 2,
    width: 120,
    marginLeft: 10,
  },
  itemDetail: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemDetailContainer: {
    alignItems: "center",
    backgroundColor: colorHelper.text.header,
    padding: 5,
    borderRadius: 2,
    width: 70,
  },
});
