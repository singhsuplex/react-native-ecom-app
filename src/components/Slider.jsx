import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get("window");

const Slider = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to fetch images (Replace this with actual API call)
    const fetchCarouselItems = () => {
      const items = [
        {
          title: "Slide 1",
          image: "https://img.freepik.com/premium-photo/turmeric-powder-bowl-with-roots-indian-spice-banner_776894-186178.jpg",
        },
        {
          title: "Slide 2",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjM0EiOlRNTCIomVZign46FOZw0zvshUx79A&s",
        },
        {
          title: "Slide 3",
          image: "https://www.shutterstock.com/image-photo/mct-coconut-butter-oil-organic-600nw-1643820763.jpg",
        },
        {
          title: "Slide 4",
          image: "https://t3.ftcdn.net/jpg/01/71/97/94/360_F_171979497_W6Ke2ZCBjOPNPkOuGsgktqSLhzYsQDSn.jpg",
        },
      ];
      setTimeout(() => {
        setCarouselItems(items);
        setLoading(false);
      }, 2000); // Simulated delay
    };

    fetchCarouselItems();
  }, []);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
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
        data={loading ? Array.from({ length: 4 }) : carouselItems} // Render skeletons while loading
        renderItem={loading ? renderSkeleton : renderCarouselItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        loop={true}
        autoplay={!loading}
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
});

export default Slider;
