import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { React, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import styles from "./events.style";

const WhatToDo = () => {
  const renderItem = ({ item }) => <ExpandableItem item={item} />;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://myneighborhoodscope.com/zipAdsJson.php"
      );
      const data = await response.json();

      var newData = data.filter((x) => x.active == 1);
      setFilteredDataSource(newData);
      console.log(newData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.roundedContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Nominated contact reference</Text>
          </View>
          <View style={styles.contactInfo}>
            <View style={styles.details}>
              <View style={styles.labelRow}>
                <Text style={styles.labelText}>Name:</Text>
                <TextInput
                  style={styles.inputText}
                  value={{}}
                  editable={false}
                />
              </View>
              <View style={styles.labelRow}>
                <Text style={styles.labelText}>Relationship:</Text>
                <TextInput
                  style={styles.inputText}
                  value="test"
                  editable={false}
                />
              </View>
              <View style={styles.labelRow}>
                <Text style={styles.labelText}>Phone number:</Text>
                <TextInput
                  style={styles.inputText}
                  value={{}}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  roundedContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15, // Adjust borderRadius value for desired curve
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  header: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  details: {
    marginLeft: 15,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  relationshipText: {
    fontSize: 14,
    color: "#808080",
  },
  phoneText: {
    fontSize: 14,
    color: "#808080",
  },
  editSection: {
    alignItems: "flex-end",
  },
  editButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default WhatToDo;
