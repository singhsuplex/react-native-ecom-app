import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native';
import Header from '../components/Header';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import axios from 'axios';

const noImage = require("../../assets/noimg.jpg");
const { width } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(parseInt(product.qty.replace(' Kg', '') || 1));
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const user = useSelector((state) => state.login.user);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      
      const productPrice = parseFloat(product.price);
      const total = quantity * productPrice;

      const cartData = {
        user: user._id,
        products: {
          product: product._id,
          quantity: quantity,
          price: productPrice
        },
        total: total
      };

      const response = await axios.post(
        'https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/cart/',
        cartData
      );

      if (response.data) {
        Alert.alert(
          "Success",
          "Product added to cart successfully!",
          [
            { 
              text: "OK",
              onPress: () => navigation.navigate('Checkout')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      Alert.alert(
        "Error",
        "Failed to add product to cart. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Image Slider Components
  const renderImageSlide = ({ item }) => {
    const imageUrl = item 
      ? `https://maa-tulya-ecom-mern-backend-app.onrender.com/${item}`
      : noImage;

    return (
      <View style={styles.slideContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.slideImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderPagination = () => {
    const images = product?.images || [];
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  const handleSlideChange = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeSlide = Math.round(offset / slideSize);
    setActiveSlide(activeSlide);
  };

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product details not available.</Text>
      </View>
    );
  }

  const renderContent = () => (
    <>
      <Header />
      <Animatable.View animation="fadeInDown" duration={800}>
        <FlatList
          data={product.images || []}
          renderItem={renderImageSlide}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleSlideChange}
          keyExtractor={(_, index) => index.toString()}
        />
        {renderPagination()}
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" duration={800} delay={200} className="p-4">
        <Text className="text-gray-900 font-bold text-xl mb-1">{product.title}</Text>
        <View className="flex-row items-center">
          <Text className="text-gray-500 font-bold text-lg line-through mr-2">
            {product.old_price || product.price}
          </Text>
          <Text className="text-gray-800 font-bold text-lg">{product.price}</Text>
        </View>

        <View className="flex-row items-center mt-2">
          <Text className="text-xl font-bold">Qty:</Text>
          <TouchableOpacity className="px-4 py-2" onPress={handleDecrement}>
            <Text className="text-3xl">-</Text>
          </TouchableOpacity>
          <TextInput
            editable={false}
            className="w-12 h-11 border border-gray-400 text-center"
            value={quantity.toString()}
            keyboardType="numeric"
          />
          <TouchableOpacity className="px-4 py-2" onPress={handleIncrement}>
            <Text className="text-xl">+</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      
      <Animatable.View animation="zoomIn" duration={800} delay={400} className="px-4 pt-0 flex-row justify-start gap-4 items-center">
        <TouchableOpacity 
          className={`bg-[#ffde59] py-2 px-8 rounded-md ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleAddToCart}
          disabled={isLoading}
        >
          <Text className='font-bold text-lg'>
            {isLoading ? 'Adding...' : 'Add Cart'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInLeft" duration={800} delay={600} className="p-4">
        <Text className="text-xl font-bold pb-4">Description</Text>
        <Text>{product.description}</Text>
      </Animatable.View>
    </>
  );

  return (
    <FlatList
      data={[{ key: 'content' }]}
      renderItem={renderContent}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  slideContainer: {
    width: width,
    height: 300,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ffde59',
  },
});

export default ProductDetails;