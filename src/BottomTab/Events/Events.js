import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Events = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={{ justifyContent: 'center', height: '100%', }}>
                <Text style={{ textAlign: 'center' }} >Coming Soon</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Events