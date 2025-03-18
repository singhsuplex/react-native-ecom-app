import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get("window");

const Slider = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch banner data from API
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/banner');
        
        if (response.data && Array.isArray(response.data.data)) {
          // Process the API response based on the actual structure
          const bannerItems = response.data.data.map((item, index) => {
            // Check if images array exists and has items
            const imagePath = item.images && item.images.length > 0 ? item.images[0] : "";
            
            // Create the full image URL by adding the base URL if needed
            // If the image path already contains http or https, use it as is
            const imageUrl = imagePath.startsWith('http') 
              ? imagePath 
              : `https://maa-tulya-ecom-mern-backend-app.onrender.com/${imagePath}`;
            
            return {
              title: `Slide ${index + 1}`,
              image: imageUrl,
              id: item._id
            };
          });
          
          setCarouselItems(bannerItems);
        } else {
          console.error('Invalid banner data format:', response.data);
          setCarouselItems([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setLoading(false);
        setCarouselItems([]);
      }
    };

    fetchBannerData();
  }, []);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      {item && item.image ? (
        <Image 
          source={{ uri: item.image }} 
          style={styles.carouselImage}
          onError={(e) => console.error('Error loading image:', e.nativeEvent.error, 'URL:', item.image)}
        />
      ) : (
        <View style={[styles.carouselImage, styles.fallbackImage]} />
      )}
    </View>
  );

  const renderSkeleton = () => (
    <View style={styles.carouselItem}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        shimmerColors={['#E0E0E0', '#F0F0F0', '#E0E0E0']}
        style={styles.carouselImage}
      />
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={loading ? Array.from({ length: 4 }) : carouselItems}
        renderItem={loading ? renderSkeleton : renderCarouselItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        loop={true}
        autoplay={!loading && carouselItems.length > 1}
        autoplayDelay={3000}
        autoplayInterval={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10,
  },
  carouselItem: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  fallbackImage: {
    backgroundColor: '#E0E0E0',
  }
});

export default Slider;