import { StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Slider from '../components/Slider';
import Products from '../components/Products';
import FeatureProduct from '../components/FeatureProduct';

const Home = ({ navigation }) => {
  const renderHeader = () => (
    <>
      <Header />
      <Slider />
      <FeatureProduct navigation={navigation} />
      <Image
        source={{
          uri: 'https://cdn.shopify.com/s/files/1/0489/5273/7960/files/Turmeric_Powder_A_Banners_-04.jpg?v=1690868861',
        }}
        className="w-full h-40"
        resizeMode="contain"
      />
    </>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={[{ key: 'products' }]}
      renderItem={() => <Products navigation={navigation} />}
      keyExtractor={(item) => item.key}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
