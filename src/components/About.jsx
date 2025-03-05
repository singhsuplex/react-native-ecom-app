import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Logo = require('../../assets/logo.png')

const About = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-[#ffde59] p-8 items-center">
        <Image
          source={Logo}
          className="h-24 w-48 mb-4"
        />
        <Text className="text-gray-800 text-2xl font-bold pt-5 mb-2">About Us</Text>
        <Text className="text-gray-800 text-center">Your Trusted Shopping Destination</Text>
      </View>

      {/* Main Content */}
      <View className="p-4">
        {/* Our Story */}
        <View className="bg-white rounded-lg shadow-md p-6 mb-4">
          <Text className="text-2xl font-bold mb-3">Our Story</Text>
          <Text className="text-gray-700 leading-6">
            Founded in 2024, we've been committed to providing our customers with the best shopping
            experience possible. Our journey started with a simple idea: to create a platform where
            quality meets affordability.
          </Text>
        </View>

        {/* Our Values */}
        <View className="bg-white rounded-lg shadow-md p-6 mb-4">
          <Text className="text-2xl font-bold mb-4">Our Values</Text>
          
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Icon name="check-circle" size={24} color="#2f415d" />
              <Text className="text-lg font-semibold ml-3">Quality First</Text>
            </View>
            <Text className="text-gray-700 ml-9">
              We never compromise on the quality of our products.
            </Text>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Icon name="heart" size={24} color="#2f415d" />
              <Text className="text-lg font-semibold ml-3">Customer Satisfaction</Text>
            </View>
            <Text className="text-gray-700 ml-9">
              Your satisfaction is our top priority.
            </Text>
          </View>

          <View>
            <View className="flex-row items-center mb-2">
              <Icon name="shield" size={24} color="#2f415d" />
              <Text className="text-lg font-semibold ml-3">Trust & Security</Text>
            </View>
            <Text className="text-gray-700 ml-9">
              We ensure secure transactions and protect your data.
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between bg-white rounded-lg shadow-md p-6">
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#2f415d]">10K+</Text>
            <Text className="text-gray-600">Products</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#2f415d]">50K+</Text>
            <Text className="text-gray-600">Customers</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-[#2f415d]">100K+</Text>
            <Text className="text-gray-600">Orders</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;