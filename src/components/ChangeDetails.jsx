import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const ChangeDetails = () => {
    return (
        <ScrollView className="flex-1 bg-gray-100">
            {/* Header with animation */}
            <Animatable.View
                animation="fadeInDown"
                duration={500}
                delay={100}
                className="bg-[#fb752e] p-6 items-center"
            >
                <Text className="text-white text-2xl font-bold">Update Your Information</Text>
            </Animatable.View>

            {/* Form with animation */}
            <Animatable.View
                animation="fadeInUp"
                duration={500}
                delay={200}
                className="p-4"
            >
                <Animatable.View animation="fadeInLeft" duration={500} delay={300} className="bg-white rounded-lg shadow-md p-4 mb-4">

                    <View className="mb-4">
                        <Text className="text-lg mb-2">Name</Text>
                        <TextInput
                            className="bg-gray-200 p-3 rounded-lg"
                            placeholder="Enter your name"
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg mb-2">Email</Text>
                        <TextInput
                            className="bg-gray-200 p-3 rounded-lg"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg mb-2">Phone</Text>
                        <TextInput
                            className="bg-gray-200 p-3 rounded-lg"
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-lg mb-2">Address</Text>
                        <TextInput
                            className="bg-gray-200 p-3 rounded-lg"
                            placeholder="Enter your address"
                        />
                    </View>

                    <TouchableOpacity className="bg-[#fb752e] p-4 mt-4 rounded-lg items-center">
                        <Text className="text-white text-lg font-bold">Save</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </Animatable.View>
        </ScrollView>
    );
};

export default ChangeDetails;