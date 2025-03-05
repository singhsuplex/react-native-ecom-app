import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

const Logo = require('../../assets/logo.png')
const Avatar = require('../../assets/avatar.png')

const Header = () => {
  // const users = useSelector((state) => console.log('bhang ...............', state));
  const user = useSelector((state) => state.login.user)
  const navigation = useNavigation();
  const [showProfile, setShowProfile] = useState(false);
  const userName = user.name || 'Unknown';  

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleOutsideClick = () => {
    if (showProfile) {
      setShowProfile(false);
    }
  };

  return (
    <>
      <View>
        <Animatable.View
          animation="fadeIn"
          delay={500}
          duration={1500}
          className="flex-row justify-between items-center p-4 border border-b border-gray-300"
        >
          <Animatable.View
            animation="slideInRight"
            duration={1200}
            className="flex-row items-center gap-5"
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="bars" size={25} color="#000" />
            </TouchableOpacity>
          </Animatable.View>

          {/* <Animatable.View animation="zoomIn" duration={1000}>
            <Image
              source={Logo}
              className="h-12 w-20 scale-125 rounded-lg"
              resizeMode='cover'
            />
          </Animatable.View> */}

          <TouchableOpacity onPress={toggleProfile}>
            <Animatable.View animation="zoomIn" duration={1000}>
              <Image
                source={Avatar}
                className="h-12 w-12 scale-125 rounded-lg"
                resizeMode='contain'
              />
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>

        {showProfile && (
          <>
            <TouchableWithoutFeedback onPress={handleOutsideClick}>
              <View className="absolute inset-0 h-full w-full bg-transparent" />
            </TouchableWithoutFeedback>
            
            <Animatable.View 
              animation="fadeInRight" 
              duration={100}
              className="absolute right-4 top-20 bg-white p-4 rounded-lg shadow-lg z-50 border border-gray-200"
            >
              <View className="flex-row items-center gap-2">
                <Icon name="user" size={16} color="#666" />
                <Text className="text-gray-800 font-semibold">{userName}</Text>
              </View>
              <TouchableOpacity 
                className="mt-2 flex-row items-center gap-2"
                onPress={() => {
                  setShowProfile(false);
                  navigation.navigate('Profile'); 
                }}
              >
                <Icon name="cog" size={16} color="#666" />
                <Text className="text-gray-600">View Profile</Text>
              </TouchableOpacity>
            </Animatable.View>
          </>
        )}
      </View>
    </>
  );
};

export default Header;