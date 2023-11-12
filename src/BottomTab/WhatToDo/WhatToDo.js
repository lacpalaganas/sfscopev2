import { View, Text, StyleSheet, SafeAreaView} from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants'
const WhatToDo = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <View style={{ justifyContent: 'center', height: '100%', }}>
        <Text style={{ textAlign: 'center' }} >Coming Soon</Text>
    </View>
</SafeAreaView>
  )
}

export default WhatToDo