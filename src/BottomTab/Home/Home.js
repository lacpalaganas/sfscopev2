import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants";
import Carousel from "../../Components/Carousel/Carousel";
import Compare from "../../Components/Compare/Compare";
import Profile from "../Profile/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginModal = ({ isVisible, isLoggedIn, onLoginSuccess }) => {
  const closeModal = () => {
    // Optionally, add logic to prevent closing the modal without login
    //console.warn('Please log in to access the app.');
  };
  const handleLoginSuccess = (username) => {
    // Perform actions related to a successful login
    console.log("Login successful ");
    closeModal(); // Close the modal after successful login
    onLoginSuccess();
  };
  return (
    <View>
      <Modal
        onBackdropPress={closeModal}
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView}>
            <Profile onLoginSuccess={handleLoginSuccess} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const Home = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setModalVisible(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("isLoggedIn");
        setLoggedIn(status === "true");
        if (status === "true") {
          setModalVisible(false);
        }
      } catch (error) {
        console.error("Error reading login status from AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, []); // The empty

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ flex: 1, padding: SIZES.medium }}>
        <Carousel />
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginTop: 5,
            fontSize: 12,
          }}
        >
          Click image for more details
        </Text>
        <Compare />
      </View>
      <LoginModal
        isVisible={isModalVisible}
        onLoginSuccess={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 15,
    padding: 15,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "95%",
    height: "90%",
  },
});
export default Home;
