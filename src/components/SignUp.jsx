import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const SignUp = ({ navigation }) => {
    return (
        <ScrollView>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 px-6 pt-5">
                    {/* Logo or Header */}
                    <View className="items-center mb-5">
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/5c/1a/db/5c1adb65fbfabcdcf6de3678508e45b4.png' }}
                            className="w-24 h-24 mb-4"
                            resizeMode="contain"
                        />
                        <View className="items-center mb-0">
                            <Text className="text-4xl font-bold text-[#2f415d] mb-4">Sign Up</Text>
                            <Text className="text-lg text-gray-600">Create your new account</Text>
                        </View>
                    </View>

                    {/* Username Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 mb-2 text-sm font-medium">Username</Text>
                        <TextInput
                            placeholder="Enter your username"
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                        />
                    </View>

                    {/* Email Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 mb-2 text-sm font-medium">Email Address</Text>
                        <TextInput
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                        />
                    </View>

                    {/* Password Input */}
                    <View className="mb-4">
                        <Text className="text-gray-700 mb-2 text-sm font-medium">Password</Text>
                        <TextInput
                            placeholder="Create a password"
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View className="mb-6">
                        <Text className="text-gray-700 mb-2 text-sm font-medium">Confirm Password</Text>
                        <TextInput
                            placeholder="Repeat your password"
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Signup Button */}
                    <TouchableOpacity
                        className="bg-[#2f415d] rounded-lg py-4 items-center shadow-md mb-6"
                    >
                        <Text className="text-white text-lg font-bold">Create Account</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="flex-row items-center mb-6">
                        <View className="flex-1 h-px bg-gray-300"></View>
                        <Text className="mx-4 text-gray-500">Or</Text>
                        <View className="flex-1 h-px bg-gray-300"></View>
                    </View>

                    {/* Social Signup */}
                    <View className="flex-row justify-center space-x-4 mb-6">
                        <TouchableOpacity
                            className="bg-gray-100 px-6 py-3 me-3 rounded-lg items-center flex-row"
                        >
                            <Icon name="google" size={20} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-gray-100 px-6 py-3 rounded-lg items-center flex-row"
                        >
                            <Icon name="facebook" size={20} color="#333" /> 
                        </TouchableOpacity>
                    </View>

                    {/* Login Link */}
                    <View className="flex-row justify-center mb-3">
                        <Text className="text-gray-600">Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-[#2f415d] font-bold">Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default SignUp;