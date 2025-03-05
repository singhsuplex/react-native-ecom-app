import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'; 
import { useSelector } from 'react-redux';


const Avatar = require('../../assets/avatar.png')
const Profile = () => {
  const user = useSelector((state) => state.login.user);
  // console.log(user)
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header with animation */}
      <Animatable.View
        animation="fadeInDown"
        duration={500}
        delay={100}
        className="bg-[#ffde59] p-6 items-center"
      >
        <Image
          source={Avatar}
          className="w-32 h-32 rounded-full mb-4"
        />
        <Text className="text-gray-800 text-2xl font-bold">{user.name}</Text>
        <Text className="text-gray-800 text-lg">{user.email}</Text>
      </Animatable.View>

      {/* Profile Info with animation */}
      <Animatable.View
        animation="fadeInUp"
        duration={500}
        delay={200}
        className="p-4"
      >
        <Animatable.View animation="fadeInLeft" duration={500} delay={300} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Text className="text-xl font-bold mb-4">Personal Information</Text>
          
          <View className="flex-row items-center mb-3">
            <Icon name="phone" size={20} color="#2f415d" />
            <Text className="ml-4 text-lg">+1 234 567 890</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <Icon name="map-marker" size={20} color="#2f415d" />
            <Text className="ml-4 text-lg">New York, USA</Text>
          </View>
          
          <View className="flex-row items-center">
            <Icon name="calendar" size={20} color="#2f415d" />
            <Text className="ml-4 text-lg">Joined January 2024</Text>
          </View>
        </Animatable.View>

        {/* Action Buttons with staggered animation */}
        <Animatable.View
          animation="fadeInUp"
          duration={500}
          delay={400}
          className="bg-white rounded-lg shadow-md p-4"
        >
          {/* Edit Profile Button */}
          <Animatable.View
            animation="zoomIn"
            duration={500}
            delay={500}
            className="flex-row items-center justify-between p-3 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <Icon name="edit" size={20} color="#2f415d" />
              <Text className="ml-4 text-lg">Edit Profile</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#2f415d" />
          </Animatable.View>

          {/* Settings Button */}
          <Animatable.View
            animation="bounceIn"
            duration={500}
            delay={600}
            className="flex-row items-center justify-between p-3 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <Icon name="cog" size={20} color="#2f415d" />
              <Text className="ml-4 text-lg">Settings</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#2f415d" />
          </Animatable.View>

          {/* Logout Button */}
          <Animatable.View
            animation="fadeInRight"
            duration={500}
            delay={700}
            className="flex-row items-center justify-between p-3"
          >
            <View className="flex-row items-center">
              <Icon name="sign-out" size={20} color="#ff4444" />
              <Text className="ml-4 text-lg text-red-500">Logout</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#ff4444" />
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
    </ScrollView>
  );
};

export default Profile;
