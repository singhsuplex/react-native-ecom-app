import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Logo = require('../../assets/logo.png');

const AgentLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleGetOTP = () => {
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }

        setError('');
        navigation.navigate('AgentDashboard');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#ffde59]">
            <View className="flex-1 px-6 pt-24">
                <Animatable.View animation="bounceInDown" duration={1500} className="items-center mb-8">
                    <Image
                        animation={{
                            0: { scale: 0.2 },
                            0.5: { scale: 0.4 },
                            1: { scale: 0.5 },
                        }}
                        duration={5000}
                        source={Logo}
                        className="w-24 h-20"
                    />
                </Animatable.View>

                <Animatable.View className='mb-8' animation="fadeIn" delay={1200}>
                    <Text className='text-4xl font-bold text-center'>Welcome To</Text>
                    <Text className='text-3xl font-bold text-center'>Agent Login</Text>
                </Animatable.View>

                {/* Email Input */}
                <Animatable.View animation="fadeIn" delay={1200} className="mb-6">
                    <Text className="text-gray-700 mb-2 font-bold">Email Address</Text>
                    <TextInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setError('');
                        }}
                        className={`border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-4 text-base`}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        required
                        placeholderTextColor="#000"
                    />
                    {error ? (
                        <Animatable.Text animation="shake" className="text-red-500 mt-1">
                            {error}
                        </Animatable.Text>
                    ) : null}
                </Animatable.View>

                {/* Get OTP Button */}
                <Animatable.View animation="zoomIn" className="flex-row items-center justify-end" delay={1500}>
                    <TouchableOpacity
                        onPress={handleGetOTP}
                        className="bg-[#461a01] px-3 py-3 w-1/2 rounded-lg shadow-lg"
                    >
                        <View className="flex-row justify-center items-center">
                            <Text className="text-white text-lg font-semibold">Get OTP</Text>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
};

export default AgentLogin;
