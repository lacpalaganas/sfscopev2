import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { React, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./events.style";
import { fetchAdsData } from "../../API/api";

const ExpandableItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesObject, setImagesObbject] = useState();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  function convertTimestampToString(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedTime = date.toLocaleTimeString(); // Or use other methods to format the time as needed

    return formattedTime;
  }
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <Text style={styles.itemTitle}>
          {`${item.description.trim()}\n`}{" "}
          <Text
            style={{ fontSize: 11, fontStyle: "italic", color: COLORS.gray }}
          >
            {expanded ? "see less.." : "see more.."}
          </Text>
        </Text>
      </TouchableOpacity>
      {expanded && (
        <>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.itemContentSubHeader}>
            Description:{" "}
            <Text style={styles.itemContent}>{item.description.trim()}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Start Date: <Text style={styles.itemContent}>{item.sdate}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            End Date: <Text style={styles.itemContent}>{item.edate}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Start Time:{" "}
            <Text style={styles.itemContent}>
              {convertTimestampToString(item.stime)}
            </Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            End Time:{" "}
            <Text style={styles.itemContent}>
              {convertTimestampToString(item.etime)}
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const Events = () => {
  const renderItem = ({ item }) => <ExpandableItem item={item} />;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAdsData();

      setFilteredDataSource(data);
      //console.log(newData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error zip Ads data: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: "90%",
            padding: 18,
            backgroundColor: COLORS.primary,
            marginTop: 20,

            borderRadius: SIZES.small / 2,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              fetchData();
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
              {`Refresh`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View style={{ justifyContent: "center", height: "100%" }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : filteredDataSource.length != 0 ? (
        <View style={[styles.container, { padding: SIZES.small }]}>
          <FlatList
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View style={{ justifyContent: "center", height: "100%" }}>
          <Text style={{ textAlign: "center" }}>No Ads listed</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Events;
