import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';


const Onboarding = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#ffde59] items-center justify-center">

      <Animatable.Image
        animation={{
          0: { scale: 0 },
          0.5: { scale: 1.5 },
          1: { scale: 1.2 },
        }}
        duration={5000}
        source={require('../../assets/logo.png')}
        className="w-72 h-48 mb-8 rounded-lg"
      />


      {/* Button Animation */}
      <Animatable.View animation="zoomIn" delay={200} style={{ position: 'absolute', bottom: 50 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="bg-[#461a01] px-8 py-4 rounded-full shadow-lg"
        >
          <View className='flex-row items-center'>
            <Animatable.View className='mr-4' animation="shake" iterationCount="infinite" duration={2000} >
              <Icon name="rocket" size={24} color="#fff" />
            </Animatable.View>
            <Text className="text-white text-lg font-semibold">Get Started</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Onboarding;
