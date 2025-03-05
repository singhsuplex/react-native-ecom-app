import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const ProductItem = ({ product, orderId, onTrackProduct, onCancelProduct }) => (
  <View className="flex-row items-center bg-white p-4 mb-4 rounded-lg border border-gray-300 shadow">
    <Image
      source={{ uri: product.image || 'https://via.placeholder.com/150' }}
      className="w-16 h-16 rounded-lg mr-4"
    />
    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-800">{product.name || 'Product Name'}</Text>
      <Text className="text-gray-500">Quantity: {product.quantity}</Text>
      <Text className="text-gray-800 font-bold mt-1"> {product.price}</Text>
    </View>
    <View className="gap-2">
      {/* Cancel Button */}
      <TouchableOpacity
        className="flex-row items-center bg-red-500 px-3 py-1 rounded-md"
        onPress={() => onCancelProduct(product.id, orderId)}
      >
        <Icon name="cancel" size={24} color="white" />
        <Text className="text-white text-sm ml-2">Cancel</Text>
      </TouchableOpacity>
      {/* Track Button */}
      <TouchableOpacity
        className="flex-row items-center bg-[#2f415d] px-3 py-1 rounded-md"
        onPress={() => onTrackProduct(product.id, orderId)}
      >
        <Icon name="local-shipping" size={24} color="white" />
        <Text className="text-white text-sm ml-2">Track Order</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Order = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.login.user); // User info from Redux
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(
          `https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/orders/user/${user._id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        Alert.alert('Error', 'Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [user]);
  
  

  const handleTrackProduct = (productId, orderId) => {
    navigation.navigate('TrackOrder', { 
      userId: user._id,
      productId,
      orderId,
    });
  };

  const handleCancelProduct = async (productId, orderId) => {
    try {
      await axios.post(
        `https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/orders/cancel`,
        { userId: user._id, productId, orderId }
      );
      Alert.alert('Success', 'The product has been canceled.');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, products: order.products.filter((product) => product.id !== productId) }
            : order
        )
      );
    } catch (error) {
      console.error('Error canceling product:', error);
      Alert.alert('Error', 'Failed to cancel the product. Please try again.');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFB200" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-4 text-[#2f415d]">My Orders</Text>
      <ScrollView>
        {orders.length > 0 ? (
          orders.map((order) =>
            order.products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                orderId={order._id}
                onTrackProduct={handleTrackProduct}
                onCancelProduct={handleCancelProduct}
              />
            ))
          )
        ) : (
          <Text className="text-center text-gray-600 mt-4">No orders found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Order;
