import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook
import * as Animatable from 'react-native-animatable'; // Import Animatable for animations

const Footer = () => {

  const navigation = useNavigation();
  
  return (
    <View className="bg-white shadow-lg py-2 px-4 flex flex-row justify-between items-center">
      {/* Home Component with Animation */}
      <Animatable.View 
        animation="fadeInUp" // Animation type
        duration={500} // Animation duration
      >
        <TouchableOpacity className="flex items-center justify-center" onPress={() => navigation.navigate('HomeStack', { screen: 'HomeScreen' })} >
          <FontAwesome5 name="home" size={20} color="black" />
          <Text className="text-lg mt-1">Home</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Cart Component with Animation */}
      <Animatable.View 
        animation="fadeInUp" // Animation type
        duration={600} // Animation duration (slightly different for variety)
      >
        <TouchableOpacity className="flex items-center justify-center" onPress={() => navigation.navigate('HomeStack', { screen: 'Checkout' })} >
          <View className='relative'>
            <FontAwesome5 name="shopping-cart" size={20} color="black" />
            {/* <View className="absolute -top-1 -right-2 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
              <Text className="text-white text-xs">0</Text>
            </View> */}
          </View>
          <Text className="text-lg mt-1">Cart</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Order Component with Animation */}
      <Animatable.View 
        animation="fadeInUp" // Animation type
        duration={700} // Animation duration
      >
        <TouchableOpacity className="flex items-center justify-center" onPress={() => navigation.navigate('HomeStack', { screen: 'Order' })}>
          <FontAwesome5 name="clipboard-list" size={20} color="black" />
          <Text className="text-lg mt-1">Order</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Account Component with Animation */}
      <Animatable.View 
        animation="fadeInUp" // Animation type
        duration={800} // Animation duration (slightly different for variety)
      >
        <TouchableOpacity className="flex items-center justify-center" onPress={() => navigation.navigate('HomeStack', { screen: 'Profile' })}>
          <FontAwesome5 name="user" size={20} color="black" />
          <Text className="text-lg mt-1">Account</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({});
