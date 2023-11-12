import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { React, useState, useEffect } from 'react'
import { COLORS, SIZES } from '../../../constants'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
const Rentals = () => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const navigation = useNavigation()
  useEffect(() => {
    // axios.get("https://lacpalaganas.github.io/VS/neighborhood.json")
    //     .then(response => { setNeighborhoods(response.data)})
    //     .catch(error => { });
    //     console.log(neighborhoods);

    const fetchData = async () => {
      try {
        const response = await fetch('https://lacpalaganas.github.io/VS/neighborhood.json');
        const data = await response.json();
        // Assuming data is an array of objects with 'nhood' key for neighborhood names
        const neighborhoodNames = data.map(item => item.nhood);
        setNeighborhoods(neighborhoodNames);
        console.log(neighborhoods);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    // Perform actions when the button is clicked

    console.log(selectedNeighborhood);
    // You can add your logic here based on the selected neighborhood
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10%'
      }}>
        <Text style={{ padding: 10, fontSize: 21, fontWeight: 700 }}>Neighborhood Select</Text>
        <Picker
          //itemStyle={{height: 80}}
          style={{ width: "100%", borderRadius: 5, borderWidth: 1, borderColor: COLORS.gray2 }}
          selectedValue={selectedNeighborhood}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedNeighborhood(itemValue)
          }
        >
          <Picker.Item label="Select.." value="" />
          {neighborhoods.map((neighborhood, index) => (
            <Picker.Item key={index} label={neighborhood} value={neighborhood} />
          ))}
        </Picker>

        {selectedNeighborhood.length != 0 ?

          <View style={{ width: '80%', padding: 10, backgroundColor: '#007BFF', marginTop: 20, borderWidth: 1, borderColor: '007BFF', borderRadius: 6 }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('View Rentals', {
                nhood: selectedNeighborhood,
                previousScreen: "Rentals"

              })
            }}>
              <Text style={{ color: "white", textAlign: 'center', fontSize: 14 }}> {`Show ${selectedNeighborhood} Rentals`}</Text>
            </TouchableOpacity>

          </View>
          : <View></View>
        }
      </View>
    </SafeAreaView>
  )
}

export default Rentals