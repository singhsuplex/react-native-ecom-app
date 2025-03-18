import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Checkout = ({ navigation }) => {
  const user = useSelector((state) => state.login.user);
  const [cartData, setCartData] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      if (!user?._id) {
        // If no user ID, show a message and stop further processing
        setLoadingProducts(false);
        setCartData(null);
        return;
      }

      console.log(user._id)

      try {
        const response = await axios.get(
          `https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/cart/${user._id}`
        );
        const data = response.data;

        setCartData(data);
        calculateTotalPrice(data.products);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchCartData();
  }, [user]);

  const calculateTotalPrice = (products) => {
    const newTotal = products.reduce(
      (acc, item) => acc + (item?.product?.price || 0) * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  };

  const handleIncrement = (index) => {
    setCartData((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index].quantity += 1;
      calculateTotalPrice(updatedProducts);
      return { ...prev, products: updatedProducts };
    });
  };

  const handleDecrement = (index) => {
    setCartData((prev) => {
      const updatedProducts = [...prev.products];
      if (updatedProducts[index].quantity > 1) {
        updatedProducts[index].quantity -= 1;
        calculateTotalPrice(updatedProducts);
      }
      return { ...prev, products: updatedProducts };
    });
  };

  // New function to handle order creation
  const handlePlaceOrder = async () => {
    if (!cartData?.products?.length) {
      Alert.alert('Error', 'No products in cart');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Prepare products data in the required format
      const formattedProducts = cartData.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const orderData = {
        userId: user._id,
        products: formattedProducts,
        total: totalPrice,
        // Optional fields with default values
        paymentMethod: "Credit Card",
        shippingAddress: {
          fullName: "John Morish",
          address: "13th Street. 47 W 13th St",
          city: "New York",
          postalCode: "10011",
          country: "USA"
        },
        paymentResult: {
          id: Date.now().toString(),
          status: "completed",
          updateTime: new Date().toLocaleTimeString(),
          emailAddress: user.email || "customer@example.com"
        },
        status: "completed"
      };

      const response = await axios.post(
        'https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/orders',
        orderData
      );

      if (response.data) {
        Alert.alert(
          'Success',
          'Order placed successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('TrackOrder')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <ScrollView>
      {/* Delivery Details */}
      <Animatable.View animation="fadeInDown" duration={800} className="my-2 p-4 bg-white shadow">
        <Text className="text-gray-700 font-bold text-xl mb-3">Deliver To:</Text>
        <Text className="font-bold text-xl text-gray-950 mb-3">John Morish</Text>
        <Text className="mb-2 text-gray-700">
          13th Street. 47 W 13th St, New York, NY 10011, USA.
        </Text>
        <Text className="text-gray-700">+01-9645566547</Text>
        <Text className="text-blue-500" onPress={() => navigation.navigate('ChangeDetails')} >Change Address</Text>
      </Animatable.View>

      {/* Product Details */}
      <Animatable.View animation="fadeInUp" duration={800} delay={200} className="my-2 p-4 bg-white shadow">
        <Text className="font-bold text-xl mb-3">Products</Text>
        {loadingProducts ? (
          <ActivityIndicator size="large" color="#FFB200" />
        ) : cartData?.products?.length > 0 ? (
          cartData.products.map((item, index) => (
            <View key={item._id} className="flex-row items-start justify-start mb-4">
              <View className="w-[30%] me-3">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="w-full h-28"
                />
              </View>
              <View className="w-[70%]">
                <Text className="text-gray-900 font-bold text-xl mb-1">
                  {item.product?.title || 'Product Name'}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-gray-800 font-bold text-lg"> {item.product?.price || 0}</Text>
                </View>

                {/* Quantity Control */}
                <View className="flex-row items-center mt-2">
                  <Text className="text-xl font-bold">Qty:</Text>
                  <TouchableOpacity className="px-4 py-2" onPress={() => handleDecrement(index)}>
                    <Text className="text-3xl">-</Text>
                  </TouchableOpacity>
                  <TextInput
                    editable={false}
                    className="w-12 h-11 border border-gray-400 text-center"
                    value={item.quantity.toString()}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity className="px-4 py-2" onPress={() => handleIncrement(index)}>
                    <Text className="text-xl">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No products in the cart</Text>
        )}
      </Animatable.View>

      {/* Price Details */}
      <Animatable.View animation="fadeInLeft" duration={800} delay={400} className="mt-2 p-4 bg-white shadow">
        <View className="p-4">
          <Text className="pb-4 text-xl font-bold">Price Details</Text>
          <View className="flex-row items-start mb-2">
            <Text className="text-base flex-1 text-start">Total Items</Text>
            <Text className="text-base flex-1 text-right">{cartData?.products?.length || 0}</Text>
          </View>
          <View className="flex-row mb-2">
            <Text className="text-base flex-1 text-start">Total Price</Text>
            <Text className="text-base flex-1 text-right"> {totalPrice}</Text>
          </View>
        </View>
      </Animatable.View>

      {/* Place Order Button */}
      <Animatable.View animation="zoomIn" duration={800} delay={600} className="p-4 pb-8 bg-white">
        <TouchableOpacity>
          <Button 
            title={isPlacingOrder ? "Placing Order..." : "Place Your Order"}
            color={'#fb752e'}
            onPress={handlePlaceOrder}
            disabled={isPlacingOrder || !cartData?.products?.length}
          />
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
