import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Products from './Products'


const AllProducts = ({navigation}) => {
  return (
    <View>
        <Products navigation={navigation}/>
    </View>
  )
}

export default AllProducts

const styles = StyleSheet.create({})