import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TrackOrder = ({ navigation, route }) => {
  // Extract params with default values
  const { orderId = "#ORD123456" } = route?.params || {};

  const orderDetails = {
    orderId: orderId,
    status: "In Transit",
    estimatedDelivery: "Dec 22, 2024",
    currentLocation: "Local Shipping Facility",
    trackingSteps: [
      {
        id: 1,
        title: "Order Placed",
        description: "Your order has been confirmed",
        time: "Dec 19, 10:30 AM",
        completed: true
      },
      {
        id: 2,
        title: "Order Processed",
        description: "Seller has processed your order",
        time: "Dec 19, 2:45 PM",
        completed: true
      },
      {
        id: 3,
        title: "In Transit",
        description: "Package is on the way",
        time: "Dec 20, 9:15 AM",
        completed: true
      },
      {
        id: 4,
        title: "Out for Delivery",
        description: "Package will be delivered today",
        time: "Expected Dec 22",
        completed: false
      },
      {
        id: 5,
        title: "Delivered",
        description: "Package has been delivered",
        time: "Expected Dec 22",
        completed: false
      }
    ]
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-[#fb752e] p-6 rounded-b-3xl">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold text-center flex-1">Track Order</Text>
        </View>
        <Text className="text-gray-300 text-center">{orderDetails.orderId}</Text>
        
        {/* Status Card */}
        <View className="bg-white p-4 rounded-xl mt-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500">Status</Text>
              <Text className="text-lg font-bold text-[#fb752e]">{orderDetails.status}</Text>
            </View>
            <View>
              <Text className="text-gray-500">Expected Delivery</Text>
              <Text className="text-lg font-bold text-[#fb752e]">{orderDetails.estimatedDelivery}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Current Location */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
        <Text className="text-gray-500">Current Location</Text>
        <View className="flex-row items-center mt-2">
          <Icon name="location-on" size={24} color="#fb752e" />
          <Text className="text-[#fb752e] font-semibold ml-2">{orderDetails.currentLocation}</Text>
        </View>
      </View>

      {/* Tracking Timeline */}
      <ScrollView className="flex-1 px-4 mt-4">
        {orderDetails.trackingSteps.map((step, index) => (
          <View key={step.id} className="flex-row">
            {/* Timeline Line */}
            <View className="items-center">
              <View className={`w-4 h-4 rounded-full ${step.completed ? 'bg-[#fb752e]' : 'bg-gray-300'}`} />
              {index !== orderDetails.trackingSteps.length - 1 && (
                <View className={`w-0.5 h-24 ${step.completed ? 'bg-[#fb752e]' : 'bg-gray-300'}`} />
              )}
            </View>
            
            {/* Content */}
            <View className="flex-1 ml-4 mb-6">
              <View className="bg-white p-4 rounded-xl shadow-sm">
                <Text className="text-lg font-bold text-[#fb752e]">{step.title}</Text>
                <Text className="text-gray-500 mt-1">{step.description}</Text>
                <Text className="text-gray-400 text-sm mt-2">{step.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Help Button */}
      <TouchableOpacity className="bg-[#fb752e] mx-4 mb-6 p-4 rounded-xl" onPress={() => navigation.navigate('Contact')}>
        <Text className="text-white text-center font-bold">Need Help?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrackOrder;