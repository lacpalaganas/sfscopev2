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
  Alert,
} from "react-native";
import { React, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewProfile = ({ onSignOut }) => {
  const [userEmail, setUserEmail] = useState(null);

  const handleSignOutPress = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.setItem("userEmail", "");
      await AsyncStorage.setItem("userID", "");
      onSignOut(); // Notify the parent component about the logout
    } catch (error) {
      console.error("Error setting login status to AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // Retrieve the stored user email
    const getUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error("Error retrieving user email:", error);
      }
    };

    getUserEmail();
  }, []);

  return (
    <>
      <Text style={{ marginBottom: 10, color: COLORS.primary }}>
        Hi, {userEmail}
      </Text>
      {/* <TouchableOpacity style={styles.rentalsButton} onPress={{}}>
        <View style={styles.buttonContent}>
          <MaterialCommunityIcons
            style={{ marginRight: 8 }}
            name="heart"
            color={COLORS.white}
            size={20}
          />
          <Text
            style={{
              color: "white",
              textAlign: "left",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {" "}
            My favorite rentals
          </Text>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: COLORS.blue }]}
        onPress={handleSignOutPress}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {" "}
          Logout
        </Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  viewCenter: {
    height: "100%",
    alignItems: "center",
    marginTop: "30%",
  },
  logoutButton: {
    width: "90%",
    padding: 18,
    //backgroundColor: COLORS.blue,
    marginTop: 10,

    borderRadius: SIZES.small / 2,
  },
  rentalsButton: {
    width: "90%",
    padding: 18,
    backgroundColor: COLORS.secondary,
    marginTop: 10,

    borderRadius: SIZES.small / 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
  },
});

export default ViewProfile;
