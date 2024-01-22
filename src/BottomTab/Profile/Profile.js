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
import Login from "./Login";
import SignUp from "./SignUp";

const Profile = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(true);
  const handleSignUpPress = () => {
    setShowLogin(false);
  };

  const handleSignInPress = () => {
    setShowLogin(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.viewCenter}>
        <MaterialCommunityIcons
          style={{ marginBottom: 5 }}
          name="account-circle"
          color={COLORS.blue}
          size={80}
        />
        {showLogin ? (
          <Login
            onSignUpPress={handleSignUpPress}
            onLoginSuccess={onLoginSuccess}
          />
        ) : (
          <SignUp onSignInPress={handleSignInPress} />
        )}
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
  },
});

export default Profile;
