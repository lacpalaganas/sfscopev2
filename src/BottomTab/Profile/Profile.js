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
  TouchableWithoutFeedback,
} from "react-native";
import { React, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "./Login";
import SignUp from "./SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewProfile from "./ViewProfile";

const Profile = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSignUpPress = () => {
    setShowLogin(false);
  };

  const handleSignInPress = async () => {
    setShowLogin(true);
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setLoggedIn(false);
    } catch (error) {
      console.error("Error setting login status to AsyncStorage:", error);
    }
  };
  const handleLogin = async () => {
    try {
      const status = await AsyncStorage.getItem("isLoggedIn");
      setLoggedIn(status);
    } catch (error) {
      console.error("Error setting login status to AsyncStorage:", error);
    }
    // setShowLogin(true);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("isLoggedIn");

        if (status === "true") {
          setLoggedIn(status === "true");
        }
      } catch (error) {
        console.error("Error reading login status from AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, []); // The empty
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.viewCenter}>
        <MaterialCommunityIcons
          style={{ marginBottom: 5 }}
          name="account-circle"
          color={COLORS.blue}
          size={80}
        />
        {isLoggedIn ? (
          <ViewProfile onSignOut={handleLogout} />
        ) : showLogin ? (
          <Login
            onSignUpPress={handleSignUpPress}
            onLoginSuccess={handleLogin}
          />
        ) : (
          <SignUp onSignInPress={handleSignInPress} />
        )}

        {/* <TouchableWithoutFeedback
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <View
            style={[
              styles.button,
              { backgroundColor: pressed ? COLORS.secondary : "transparent" },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: pressed ? "white" : COLORS.secondary },
              ]}
            >
              Continue as Guest
            </Text>
          </View>
        </TouchableWithoutFeedback> */}
      </View>
    </SafeAreaView>
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
    flex: 1,

    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 20, // Adjust this value according to your needs
    width: "90%",
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    borderWidth: 3,
    borderRadius: SIZES.small / 2,
    borderColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Profile;
