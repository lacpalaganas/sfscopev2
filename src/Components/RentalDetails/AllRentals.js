import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
} from "react-native";
import { React, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import styles from "./rentaldetails.style";
import { Entypo } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAllRentals } from "../../API/api";

// Function to render each image
const renderImage = ({ item }) => (
  <Image source={{ uri: item }} style={styles.image} />
);

const ExpandableRentalsItem = ({ item, showFavorite, userId }) => {
  const [expanded, setExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesObject, setImagesObbject] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavorites, setShowFavorites] = useState(showFavorite);
  const [rentalId, setRentalId] = useState(item.id);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getRentalImages();
    //checkLoginStatus();
    handlePress();
  }, []);

  const getRentalImages = () => {
    const nonNullPhotos = Object.keys(item)
      .filter((key) => key.startsWith("photo") && item[key] !== null) // Filter keys starting with "photo" and non-null values
      .map((key) => item[key]); // Map non-null values to an array

    // Display non-null photos
    //console.log(nonNullPhotos);
    setImages(nonNullPhotos);
    // Convert the array to an array of objects with a key
    // const dataObjects = nonNullPhotos.map((value, index) => ({
    //     key: index.toString(),
    //     value: value,
    // }));

    // setImagesObbject(dataObjects);
    // console.log(imagesObject);
    //setImages(["https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg","https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="]);
  };
  // Function to handle pressing the heart icon
  const handlePress = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("rentalId", rentalId);
      const response = await fetch(
        "https://myneighborhoodscope.com/favorites.php"
      );
      const data = await response.json();
      console.log(data);
      // Assuming the response is an object with a property 'isFavorite' indicating whether it's favorited or not
      setIsFavorite(data === 1); // Update the state based on the response
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <Text style={styles.itemTitle}>
          {`${item.title1} | ${item.price}\n`}{" "}
          <Text
            style={{ fontSize: 13, fontStyle: "italic", color: COLORS.gray }}
          >
            {expanded ? "see less.." : "see more.."}
          </Text>
          {/* <Entypo name={expanded ? 'chevron-down' : 'chevron-right'} size={14} color="black" /> */}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <>
          {showFavorites && (
            <TouchableOpacity onPress={handlePress}>
              <View>
                <MaterialCommunityIcons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={30}
                  color={isFavorite ? "red" : "black"}
                />
              </View>
            </TouchableOpacity>
          )}

          <Text style={styles.itemContentSubHeader}>
            Contact: <Text style={styles.itemContent}>{item.contact}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Price: <Text style={styles.itemContent}>{item.price}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Rent period:{" "}
            <Text style={styles.itemContent}>{item.rentPeriod}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Bedrooms: <Text style={styles.itemContent}>{item.bedrooms}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Bathrooms: <Text style={styles.itemContent}>{item.bathrooms}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Pets: <Text style={styles.itemContent}>{item.pets}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Furnished: <Text style={styles.itemContent}>{item.furnished}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Wheelchair:{" "}
            <Text style={styles.itemContent}>{item.wheelchair}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Airconditioning:{" "}
            <Text style={styles.itemContent}>{item.airconditioning}</Text>
          </Text>
          <Text style={styles.itemContentSubHeader}>
            Parking: <Text style={styles.itemContent}>{item.parking}</Text>
          </Text>
          {/* <View>
                      <SliderBox
                          images={images}
                          sliderBoxHeight={200}
                          ImageComponentStyle={{ borderRadius: 15, width: '90%', marginTop: 5, marginRight: 33, }}
                          dotColor={COLORS.tertiary}
                          inactiveDotColor="#90A4AE"
                          onCurrentImagePressed={index => Linking.openURL(`${images[index]}`)}
                          paginationBoxVerticalPadding={10}
  
                          autoplay
                          circleLoop
  
                      />
                      </View> */}
          {/* <Image source={{ uri: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" }}
                                      style={styles.image}
                                  /> */}

          <FlatList
            horizontal
            data={images}
            renderItem={renderImage}
            keyExtractor={(item) => item.id}
            key={(item) => item.id}
          />
          <Text
            style={{
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 5,
              fontSize: 10,
            }}
          >
            Swipe left and right to view more images
          </Text>
        </>
      )}
    </View>
  );
};
const AllRentals = () => {
  const renderItem = ({ item }) => (
    <ExpandableRentalsItem
      item={item}
      showFavorite={isLoggedIn}
      userId={userId}
    />
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const route = useRoute();
  const { nhood } = route.params;
  //const { previousScreen } = route.params;
  const navigation = useNavigation();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const checkLoginStatus = async () => {
    try {
      const statusSession = await AsyncStorage.getItem("isLoggedIn");
      const userId = await AsyncStorage.getItem("userID");

      if (statusSession === "true") {
        setLoggedIn(statusSession === "true");
        // setShowFavorites(true);
        setUserId(userId);
        console.log(userId);
      }
    } catch (error) {
      console.error("Error reading login status from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllRentals();
      setFilteredDataSource(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            fetchData();
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.vwMainArea}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : filteredDataSource.length != 0 ? (
        <View style={[styles.container, { padding: SIZES.small }]}>
          <FlatList
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            key={(item) => item.id}
          />
        </View>
      ) : (
        <View style={styles.vwMainArea}>
          <Text style={{ textAlign: "center" }}>No rentals found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllRentals;
