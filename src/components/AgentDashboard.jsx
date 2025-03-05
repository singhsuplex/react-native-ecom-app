import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const AgentDashboard = ({ navigation }) => {
  const orders = [
    {
      orderId: '#ORD123456',
      customerName: 'John Doe',
      status: 'In Transit',
      address: '1234 Elm Street, Cityville',
      deliveryTime: 'Dec 22, 2024 - 3:00 PM',
      items: [
        { name: 'Smartphone', quantity: 1 },
        { name: 'Headphones', quantity: 2 },
      ]
    },
    {
      orderId: '#ORD789101',
      customerName: 'Jane Smith',
      status: 'Out for Delivery',
      address: '5678 Maple Avenue, Townsville',
      deliveryTime: 'Dec 22, 2024 - 4:30 PM',
      items: [
        { name: 'Laptop', quantity: 1 },
        { name: 'Phone Case', quantity: 1 },
      ]
    }
  ];


  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-[#fff] border border-gray-400 p-6 rounded-b-3xl">
        <View className="flex-row items-center mb-1">
          <Text className="text-[#2f415d] text-2xl font-bold text-center flex-1">Assigned Orders</Text>
        </View>
      </View>

      {/* Orders List */}
      <ScrollView className="flex-1 px-4 mt-4">
        {orders.map((order, index) => (
          <View key={order.orderId} className="bg-white rounded-2xl shadow-lg mb-4 p-6">
            {/* Order Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-[#2f415d]">{order.customerName}</Text>
              <Text className={`text-sm font-bold ${order.status === 'Out for Delivery' ? 'text-[#4CAF50]' : 'text-[#FF5722]'}`}>{order.status}</Text>
            </View>

            {/* Order Details */}
            <Text className="text-gray-600">Order ID: {order.orderId}</Text>
            <Text className="text-gray-600">Address: {order.address}</Text>
            <Text className="text-gray-600 mt-2">Delivery Time: {order.deliveryTime}</Text>

            {/* Items List */}
            <View className="mt-4">
              <Text className="text-[#2f415d] font-semibold">Items:</Text>
              {order.items.map((item, idx) => (
                <Text key={idx} className="text-gray-600">- {item.name} x{item.quantity}</Text>
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity className="bg-[#ffde59] mt-6 p-4 rounded-xl" onPress={() => navigation.navigate('OrderDetails', { orderId: order.orderId })}>
              <Text className="text-black text-center font-bold">View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AgentDashboard;
