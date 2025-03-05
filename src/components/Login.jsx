import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const Logo = require('../../assets/logo.png')

const Login = ({ navigation }) => {
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
        navigation.navigate('VerifyOtp', { email });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#ffde59]">

            {/* ========================================= */}

            {/* <Animatable.View animation="fadeInUp" delay={1000} className="absolute top-2  right-2">
                <TouchableOpacity
                    className="bg-[#461a01] py-2 px-4 rounded-full " onPress={() => navigation.navigate('AgentLogin')}
                >
                    <Text className='text-white'>Agent Login</Text>
                </TouchableOpacity>
            </Animatable.View> */}

            {/* ========================== */}
            <View className="flex-1 px-6 pt-24">
                <Animatable.View animation="bounceInDown" duration={1500} className="items-center mb-12">
                    <Image
                        animation={{
                            0: { scale: 0 },
                            0.5: { scale: 1.5 },
                            1: { scale: 1.2 },
                        }}
                        duration={5000}
                        source={Logo}
                        className="w-60 h-52 mb-4"
                    />
                    {/* <Animatable.Text animation="fadeIn" delay={500} className="text-3xl font-bold text-[#2f415d]">
                        Welcome Back
                    </Animatable.Text>
                    <Animatable.Text animation="fadeInUp" delay={1000} className="text-gray-500 mt-2">
                        Sign in to continue
                    </Animatable.Text> */}
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
                {/* <Animatable.View animation="zoomIn" delay={1500}>
                    <TouchableOpacity
                        className="bg-[#2f415d] rounded-lg py-3 items-center shadow-md"
                        onPress={handleGetOTP}
                    >
                        <Text className="text-white text-lg font-bold">Get OTP</Text>
                    </TouchableOpacity>
                </Animatable.View> */}

                <Animatable.View animation="zoomIn" className='flex-row items-center justify-end' delay={1500} >
                    <TouchableOpacity
                        onPress={handleGetOTP}
                        className="bg-[#461a01] px-3 py-3 w-1/2  rounded-lg shadow-lg"
                    >
                        <View className="flex-row justify-center items-center">
                            {/* <Animatable.View className="mr-4" animation="shake" iterationCount="infinite" duration={2000}>
                                <Icon name="rocket" size={24} color="#fff" />
                            </Animatable.View> */}
                            <Text className="text-white text-lg font-semibold">Get OTP</Text>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>


                <Animatable.View animation="fadeInUp" delay={1000} className="mt-10 items-center">
                    <Text className="text-gray-900 mb-4">Or continue with</Text>
                    <View className="flex-row justify-center space-x-4 mb-6">
                        <TouchableOpacity
                            className="bg-[#461a01] px-6 py-3 me-3 rounded-lg items-center flex-row"
                        >
                            <Icon name="google" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-[#461a01] px-6 py-3 rounded-lg items-center flex-row"
                        >
                            <Icon name="facebook" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </Animatable.View>

                <Animatable.View animation="bounceInUp" delay={1500}>
                    <TouchableOpacity
                        className=" py-3 pb-5 "
                        onPress={() => navigation.navigate('HomeStack', { screen: 'HomeScreen' })}
                    >
                        <Text className="text-[#461a01] text-center text-lg font-bold">Skip Login</Text>
                    </TouchableOpacity>
                </Animatable.View>

            </View>
        </SafeAreaView>
    );
};

export default Login;
