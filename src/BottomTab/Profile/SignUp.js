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

const SignUp = ({ onSignInPress }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpResult, setSignUpResult] = useState(null);

  const handleSignUp = async () => {
    console.log(
      `Email: ${email}, PhoneNum: ${phoneNum} , Password: ${password}`
    );
    // Add your authentication logic here (e.g., API call, validation)
    try {
      setLoading(true);
      setSignUpResult(null);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phoneNum);
      formData.append("password", password);
      const response = await axios.post(
        "https://myneighborhoodscope.com/register.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;
      console.log(result);
      if (result == 0) {
        console.log("This account is already registered");
        setSignUpResult("The email/phone is already registered");
      } else if (result == 1) {
        console.log("Sign Up successful");
        setSignUpResult("Sign Up successful");
        onSignInPress();
      } else {
        console.log("Unexpected response:", result);
        setSignUpResult("Unexpected response");
      }
    } catch (error) {
      console.error("Error during sign up:", error.message);
      setSignUpResult("Error during sign up");
    } finally {
      // Set loading back to false after the response is received
      setLoading(false);
    }
  };
  // Update the disabled state based on the input fields
  const updateButtonState = () => {
    setDisabled(
      !isEmailValid(email) || phoneNum.trim() === "" || password.trim() === ""
    );
  };
  useEffect(() => {
    updateButtonState();
  }, [email, phoneNum, password]);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <>
      <Text style={{ marginBottom: 10, color: COLORS.primary }}>
        Sign up to get started.
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Email"
        placeholderTextColor={COLORS.gray2}
        value={email.trim()}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        style={styles.textInputStyle}
        placeholder="Phone number"
        placeholderTextColor={COLORS.gray2}
        value={phoneNum.trim()}
        onChangeText={(text) => {
          setPhoneNum(text);
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
        disabled={disabled}
        onPress={handleSignUp}
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
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      {signUpResult && (
        <View style={styles.loginResultContainer}>
          <Text style={{ color: COLORS.gray2 }}>{signUpResult}</Text>
        </View>
      )}

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <TouchableOpacity onPress={onSignInPress}>
          <Text style={styles.signUpLink}>Login</Text>
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

export default SignUp;
