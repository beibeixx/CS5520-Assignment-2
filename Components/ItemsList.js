/**
 * ItemsList.js
 *
 * This component renders a list of activities or diet entries
 * using FlatList. It displays details such as title/description,
 * date, duration/calories, and a warning icon for special items.
 */
import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { colorHelper } from "../Helper/colorHelper";
import { fontHelper } from "../Helper/fontHelper";
import { shapeHelper } from "../Helper/shapeHelper";

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
    padding: shapeHelper.padding.listMain,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorHelper.background.primary,
    borderRadius: shapeHelper.borderRadius.mid,
    padding: shapeHelper.padding.listMain,
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
    color: colorHelper.text.header,
    fontSize: fontHelper.size.title,
    fontWeight: fontHelper.style.bold,
    marginRight: 10,
  },
  itemDate: {
    fontSize: fontHelper.size.content,
    fontWeight: fontHelper.style.bold,
  },
  itemDateContainer: {
    backgroundColor: colorHelper.text.header,
    padding: shapeHelper.padding.listInside,
    marginRight: 5,
    borderRadius: shapeHelper.borderRadius.small,
    width: 120,
    marginLeft: 10,
    alignItems: "center",
  },
  itemDetail: {
    fontSize: fontHelper.size.content,
    fontWeight: fontHelper.style.bold,
  },
  itemDetailContainer: {
    alignItems: "center",
    backgroundColor: colorHelper.text.header,
    padding: shapeHelper.padding.listInside,
    borderRadius: shapeHelper.borderRadius.small,
    width: 70,
  },
});
