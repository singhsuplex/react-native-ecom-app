import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { fetchProducts } from '../services/Services.jsx';
import * as Animatable from 'react-native-animatable';
// import useGetProducts from '../core/hooks/queries/useGetProducts.js';

const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  // const {data, isPending} = useGetProducts()

  const renderSkeleton = () => (
    <View className="bg-white rounded-lg overflow-hidden shadow-lg m-2 w-[45%]">
      {/* Image Skeleton */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        shimmerColors={['#E0E0E0', '#F0F0F0', '#E0E0E0']}
        style={{ width: '100%', height: 160 }}
      />
      <View className="p-4">
        {/* Title Skeleton */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={['#E0E0E0', '#F0F0F0', '#E0E0E0']}
          style={{ width: '80%', height: 20, marginBottom: 8 }}
        />
        {/* Price Skeleton */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={['#E0E0E0', '#F0F0F0', '#E0E0E0']}
          style={{ width: '40%', height: 20 }}
        />
      </View>
    </View>
  );

  const renderProduct = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      className="bg-white rounded-lg overflow-hidden shadow-lg m-2 w-[45%]"
    >
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <Image source={{ uri: `https://maa-tulya-ecom-mern-backend-app.onrender.com/${item.images[0]}` }} className="w-full h-40" />
        <View className="p-4">
          <Text className="text-gray-900 font-bold text-xl mb-1" numberOfLines={2}>
            {item.title}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className='flex-row items-center'>
              <Text className="text-gray-500 font-bold text-lg mr-2 line-through">{item.old_price}</Text>
              <Text className="text-gray-800 font-bold text-lg">{item.price}</Text>
            </View>
            <TouchableOpacity className="px-4 py-2 rounded-full">
              <Icon name="shopping-cart" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  const handleSeeMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 4, products.length));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <FlatList
          data={Array.from({ length: visibleProducts })}
          renderItem={renderSkeleton}
          keyExtractor={(_, index) => `skeleton-${index}`}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  }

  return (
    <Animatable.View animation="fadeIn" duration={1000} className="p-2">
      <Text className="text-2xl text-center uppercase py-4 font-bold">Feature Product</Text>
      <FlatList
        data={products.slice(0, visibleProducts)}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      {visibleProducts < products.length && (
        <View className="items-center my-4">
          <TouchableOpacity className="bg-[#2f415d] w-1/3 items-center p-2 rounded-lg" onPress={handleSeeMore}>
            <Text className="text-center text-lg text-white">See More</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animatable.View>
  );
};

export default Products;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 4,
  },
});