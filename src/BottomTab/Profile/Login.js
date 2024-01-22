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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ onSignUpPress, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginResult, setLoginResult] = useState(null);

  const handleLogin = async () => {
    console.log(`Username: ${username}, Password: ${password}`);
    // Add your authentication logic here (e.g., API call, validation)
    try {
      setLoading(true);
      setLoginResult(null);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post(
        "https://myneighborhoodscope.com/userLogin.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;
      console.log(result);
      if (result == 1) {
        console.log("Login successful");
        setLoginResult("Login successful");
        await AsyncStorage.setItem("userEmail", username);
        await AsyncStorage.setItem("isLoggedIn", "true");
        onLoginSuccess(username);
      } else if (result == 2) {
        console.log("User not found");
        setLoginResult("User not found");
      } else if (result == 0) {
        console.log("user/password not match");
        setLoginResult("username or password does not match");
      } else {
        console.log("Unexpected response:", result);
        setLoginResult("Unexpected response");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoginResult("Error during login");
    } finally {
      // Set loading back to false after the response is received
      setLoading(false);
    }
  };
  // Update the disabled state based on the input fields
  const updateButtonState = () => {
    setDisabled(!isEmailValid(username) || password.trim() === "");
  };
  useEffect(() => {
    updateButtonState();
  }, [username, password]);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const showInfoMessage = () => {
    Alert.alert("Login Information", "Login by using email or phone number");
  };
  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <>
      <Text style={{ marginBottom: 10, color: COLORS.primary }}>
        Login to your account.
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Username (email)"
        placeholderTextColor={COLORS.gray2}
        value={username.trim()}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={COLORS.gray2}
          secureTextEntry={!showPassword}
          value={password.trim()}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.showPasswordButton}
        >
          {showPassword ? (
            <MaterialCommunityIcons
              name="eye-off"
              size={24}
              color={COLORS.gray2}
            />
          ) : (
            <MaterialCommunityIcons name="eye" size={24} color={COLORS.gray2} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.loginButton,
          { backgroundColor: disabled ? COLORS.gray2 : COLORS.blue },
        ]}
        disabled={disabled || loading}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {" "}
            Login
          </Text>
        )}
      </TouchableOpacity>

      {loginResult && (
        <View style={styles.loginResultContainer}>
          <Text style={{ color: COLORS.gray2 }}>{loginResult}</Text>
        </View>
      )}

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onSignUpPress}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,

    borderColor: COLORS.gray2,
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.small / 2,
    width: "90%",
    marginTop: 0,
    paddingHorizontal: SIZES.medium,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: COLORS.gray2,
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.small / 2,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 40,
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
  },
  loginButton: {
    width: "90%",
    padding: 18,
    //backgroundColor: COLORS.blue,
    marginTop: 10,

    borderRadius: SIZES.small / 2,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpText: {
    color: "black",
  },
  signUpLink: {
    color: COLORS.blue,
    fontWeight: "bold",
  },
  loginResultContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default Login;
