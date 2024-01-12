import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import { React, useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
//import styles from "./events.style";


const WhatToDo = () => {
  const renderItem = ({ item }) => (
    <ExpandableItem item={item} />
  );
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
       
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        setIsLoading(true);
      const response = await fetch('https://myneighborhoodscope.com/zipAdsJson.php');
      const data = await response.json();
      
      var newData = data.filter((x) => x.active == 1);
      setFilteredDataSource(newData);
      console.log(newData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <View style={{ justifyContent: 'center', height: '100%', }}>
        <Text style={{ textAlign: 'center' }} >Coming Soon</Text>
    </View>
</SafeAreaView>
  )
}

export default WhatToDo