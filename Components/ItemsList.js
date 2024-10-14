import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext }  from "react";
import { DataContext } from '../DataContext';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ItemsList({ type }) {
    const { activities, diets } = useContext(DataContext);

    const data = type === 'activities' ? activities : diets;

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemTitle}>{type === 'activities' ? item.title : item.description}</Text>
          {item.isSpecial && <AntDesign name="warning" size={24} color="yellow" />}
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.itemDate}>{new Date(item.date).toDateString()}</Text>
          <Text style={styles.itemDetail}>
            {type === 'activities' ? `${item.duration} min` : `${item.calories} cal`}
          </Text>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#483D8B',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemRight: {
      alignItems: 'flex-end',
    },
    itemTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
    },
    itemDate: {
      color: 'white',
      fontSize: 14,
    },
    itemDetail: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });