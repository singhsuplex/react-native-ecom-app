import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { DrawerContentScrollView } from '@react-navigation/drawer';
const ProfilePic = require('../../assets/sidebar-bg.jpg');
const Avatar = require('../../assets/avatar.png')

const DrawerItem = ({ icon, label, onPress, isActive }) => (
  <TouchableOpacity 
    className={`flex-row items-center p-4 mx-2 rounded-lg ${isActive ? 'bg-[#fb752e]' : ''}`}
    onPress={onPress}
  >
    <Icon name={icon} size={24} color={isActive ? '#fff' : '#fb752e'} />
    <Text className={`ml-4 text-lg ${isActive ? 'text-white' : 'text-gray-800'}`}>{label}</Text>
  </TouchableOpacity>
);

const Sidebar = (props) => {
  const { state, navigation } = props;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <View {...props} className="flex-1">
      {/* Profile Section */}
      <View style={{ height: 200 }}>
        <ImageBackground
          source={ProfilePic}  
          style={{ flex: 1, padding: 24 }} 
        >
          <Image
            source={Avatar}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16 }}
          />
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>John Doe</Text>
          <Text style={{ color: 'black', fontSize: 14 }}>{currentDate}</Text>
        </ImageBackground>
      </View>

      {/* Navigation Links */}
      <View className="flex-1 mt-5">
        <DrawerItem 
          icon="home"
          label="Home"
          onPress={() => navigation.navigate('HomeStack')}
          isActive={state.index === 0}
        />
        <DrawerItem 
          icon="user"
          label="Profile"
          onPress={() => navigation.navigate('Profile')}
          isActive={state.index === 1}
        />
        <DrawerItem 
          icon="info-circle"
          label="About"
          onPress={() => navigation.navigate('About')}
          isActive={state.index === 2}
        />
        <DrawerItem 
          icon="envelope"
          label="Contact"
          onPress={() => navigation.navigate('Contact')}
          isActive={state.index === 3}
        />
      </View>
    </View>
  );
};

export default Sidebar;