import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import { COLORS, SIZES } from "../../../constants";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { fetchRentalsData } from "../../API/api";

const Rentals = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRentalsData();
        const neighborhoodNames = data.map((item) => item.nhood);
        setNeighborhoods(neighborhoodNames);
        //console.log(neighborhoods);
      } catch (error) {
        console.error("Error fetching rentals data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewCenter}>
        <Text style={styles.titleStyle}>Neighborhood Select</Text>
        <Picker
          //itemStyle={{height: 80}}
          style={{
            width: "90%",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.gray2,
          }}
          selectedValue={selectedNeighborhood}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedNeighborhood(itemValue)
          }
        >
          <Picker.Item label="Select.." value="" />
          {neighborhoods.map((neighborhood, index) => (
            <Picker.Item
              key={index}
              label={neighborhood}
              value={neighborhood}
            />
          ))}
        </Picker>

        {selectedNeighborhood.length != 0 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("View Rentals", {
                nhood: selectedNeighborhood,
                previousScreen: "Rentals",
              });
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 14 }}>
              {`Show ${selectedNeighborhood} Rentals`}
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  subContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0%",
  },
  viewCenter: {
    height: "100%",
    alignItems: "center",
    marginTop: "30%",
    flex: 1,
    alignItems: "center",
  },
  titleStyle: {
    padding: 10,
    fontSize: 21,
    fontWeight: 700,
  },
  dropDownStyle: {
    width: "80%",
    padding: 10,
    backgroundColor: "#007BFF",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "007BFF",
    borderRadius: 6,
  },
  button: {
    width: "90%",
    padding: 18,
    backgroundColor: COLORS.primary,
    marginTop: 10,

    borderRadius: SIZES.small / 2,
  },
});

export default Rentals;
