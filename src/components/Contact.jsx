import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'; // Import Animatable

const Contact = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header with animation */}
      <Animatable.View
        animation="fadeInDown"
        duration={600}
        delay={200}
        className="bg-[#ffde59] p-8"
      >
        <Text className="text-gray-800 text-2xl font-bold text-center">Contact Us</Text>
        <Text className="text-gray-800 text-center mt-2">
          Have questions? We'd love to hear from you.
        </Text>
      </Animatable.View>

      {/* Contact Information with animation */}
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        delay={300}
        className="p-4"
      >
        {/* Contact Cards with animation */}
        <Animatable.View
          animation="fadeInLeft"
          duration={600}
          delay={400}
          className="flex-row flex-wrap justify-between mb-6"
        >
          <Animatable.View
            animation="zoomIn"
            duration={500}
            delay={500}
            className="bg-white rounded-lg p-4 shadow-md w-[48%] mb-4"
          >
            <Icon name="phone" size={24} color="#2f415d" className="mb-2" />
            <Text className="text-lg font-bold mb-1">Phone</Text>
            <Text className="text-gray-600">+1 234 567 890</Text>
          </Animatable.View>

          <Animatable.View
            animation="zoomIn"
            duration={500}
            delay={600}
            className="bg-white rounded-lg p-4 shadow-md w-[48%] mb-4"
          >
            <Icon name="envelope" size={24} color="#2f415d" className="mb-2" />
            <Text className="text-lg font-bold mb-1">Email</Text>
            <Text className="text-gray-600">support@example.com</Text>
          </Animatable.View>

          <Animatable.View
            animation="zoomIn"
            duration={500}
            delay={700}
            className="bg-white rounded-lg p-4 shadow-md w-[48%]"
          >
            <Icon name="map-marker" size={24} color="#2f415d" className="mb-2" />
            <Text className="text-lg font-bold mb-1">Address</Text>
            <Text className="text-gray-600">123 Store Street, NY, USA</Text>
          </Animatable.View>

          <Animatable.View
            animation="zoomIn"
            duration={500}
            delay={800}
            className="bg-white rounded-lg p-4 shadow-md w-[48%]"
          >
            <Icon name="clock-o" size={24} color="#2f415d" className="mb-2" />
            <Text className="text-lg font-bold mb-1">Working Hours</Text>
            <Text className="text-gray-600">Mon-Fri: 9AM - 6PM</Text>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({});
