import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { fetchProducts } from '../services/Services.jsx';
import Icon from 'react-native-vector-icons/AntDesign';

const FeatureProduct = ({ navigation }) => {
    const [products, setProducts] = useState([]);
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


    if (loading) {
       
        return (
            
            <View className="m-4 overflow-hidden p-4 bg-[#fb752e] border border-blue-200 rounded-lg mt-8">
                {/* <View className=" pb-6 flex-row items-center justify-between ">
                    <Text className="text-[#2f415d] font-bold">New Arrivals</Text>
                    <Text className="font-bold">See All</Text>
                </View> */}
                
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <View
                            key={index}
                            className="w-32 mr-3 inline-block rounded-lg bg-white overflow-hidden shadow-lg border border-gray-300"
                        >
                            {/* Image Skeleton */}
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                shimmerColors={['#E0E0E0', '#F0F0F0', '#E0E0E0']}
                                style={{ width: '100%', height: 112 }}
                            />
                            {/* Text Skeleton */}
                            <View className="p-2">
                                <ShimmerPlaceholder
                                    LinearGradient={LinearGradient}
                                    shimmerColors={['#E0E0E0', '#F0F0F0', '#E0E0E0']}
                                    style={{ width: '80%', height: 20, marginBottom: 8, alignSelf: 'center' }}
                                />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }

    return (
        <View className="m-4 overflow-hidden  p-4 bg-[#fb752e] border border-blue-200 rounded-lg mt-8">
            <View className=" pb-6 flex-row items-center justify-between ">
                <Text className="text-[#fff] font-bold">New Arrivals</Text>
                {/* <Text className="font-bold text-white">See All</Text> */}
            </View>

            <ScrollView
                horizontal={true}
                style={{ flexDirection: 'row' }}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
                {products.slice(0, 4).map((item, index) => (
                    <View
                        key={item._id}
                        className="w-32 mr-3 inline-block rounded-lg bg-white overflow-hidden shadow-lg border border-gray-300"
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
                            <Image
                                source={{
                                    uri: `https://maa-tulya-ecom-mern-backend-app.onrender.com/${item.images[0]}`
                                }}
                                className="w-full h-28"
                            />
                            <View className="p-2">
                                <Text className="text-gray-800 text-md mb-1 text-center" numberOfLines={1}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}

                <View className="w-32 inline-block rounded-lg bg-white overflow-hidden shadow-lg border border-gray-300">
                    <TouchableOpacity
                        className="items-center mt-8"
                        onPress={() => navigation.navigate('Products')}
                    >
                        <View className="w-14 h-14 border border-gray-400 flex-row items-center rounded-full">
                            <Icon name="arrowright" className="ml-3 font-bold" size={25} color="#000" />
                        </View>
                        <View className="p-2">
                            <Text className="text-[#2f415d] text-lg mb-1" numberOfLines={1}>
                                View All
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default FeatureProduct;
