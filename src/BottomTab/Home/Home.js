import { View, Text, StyleSheet, SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES } from '../../../constants'
import Carousel from '../../Components/Carousel/Carousel'
import Compare from '../../Components/Compare/Compare'
const Home = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <StatusBar
       
        backgroundColor="#61dafb"
        barStyle='dark-content'
        
      />
            {/* <View>
                <Text>Home</Text>
                <Text onPress={() => navigation.navigate('Details')}>Details</Text>
            </View> */}
            <View style={{ flex: 1, padding: SIZES.medium }}>

                <Carousel />

                <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 5, fontSize: 12 }}>
                    Click image for more details
                </Text>
                <Compare />





            </View>
        </SafeAreaView>

    )
}

export default Home