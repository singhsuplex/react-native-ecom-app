import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, FlatList, Alert, Dimensions, Modal, ScrollView } from 'react-native';
import Header from '../components/Header';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';

const noImage = require("../../assets/noimg.jpg");
const { width } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(parseInt(product.qty.replace(' Kg', '') || 1));
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // New states for subscription options
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(parseFloat(product.price || 0));
  
  const user = useSelector((state) => state.login.user);

  const handleIncrement = () => {
    setQuantity(quantity + 1); 
    calculateTotalPrice(quantity + 1, selectedDates);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      calculateTotalPrice(quantity - 1, selectedDates);
    }
  };

  const selectSubscriptionType = (type) => {
    setSubscriptionType(type);
    setSelectedDates({});
    setStartDate('');
    setShowCalendar(true);
  };

  const calculateTotalPrice = (qty, dates) => {
    const productPrice = parseFloat(product.price);
    const datesCount = Object.keys(dates).length;
    const total = datesCount > 0 ? qty * productPrice * datesCount : qty * productPrice;
    setTotalPrice(total);
    return total;
  };

  const handleDateSelect = (day) => {
    // Get the current month and year
    const selectedDate = day.dateString;
    const [year, month] = selectedDate.split('-');
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    
    let newSelectedDates = {};
    
    if (subscriptionType === 'daily') {
      // For daily, select all remaining days in the month
      for (let i = parseInt(selectedDate.split('-')[2]); i <= daysInMonth; i++) {
        const dateStr = `${year}-${month}-${i.toString().padStart(2, '0')}`;
        newSelectedDates[dateStr] = { selected: true, selectedColor: '#fb752e' };
      }
    } 
    else if (subscriptionType === 'alternative') {
      // For alternative, select every other day
      let alternate = false;
      for (let i = parseInt(selectedDate.split('-')[2]); i <= daysInMonth; i++) {
        if (i === parseInt(selectedDate.split('-')[2]) || alternate) {
          const dateStr = `${year}-${month}-${i.toString().padStart(2, '0')}`;
          newSelectedDates[dateStr] = { selected: true, selectedColor: '#fb752e' };
          alternate = !alternate;
        } else {
          alternate = !alternate;
        }
      }
    } 
    else if (subscriptionType === 'onetime') {
      // For one-time, select just the chosen date
      newSelectedDates[selectedDate] = { selected: true, selectedColor: '#fb752e' };
    }
    
    setStartDate(selectedDate);
    setSelectedDates(newSelectedDates);
    calculateTotalPrice(quantity, newSelectedDates);
    
    // Close the calendar after a short delay to allow the user to see the selection
    setTimeout(() => {
      setShowCalendar(false);
    }, 800);
  };

  const handleAddToCart = async () => {
    if (!subscriptionType) {
      Alert.alert(
        "Selection Required",
        "Please select a delivery option (Daily, Alternative, or One-time)."
      );
      return;
    }
    
    if (Object.keys(selectedDates).length === 0) {
      Alert.alert(
        "Date Selection Required",
        "Please select delivery date(s)."
      );
      return;
    }
    
    try {
      setIsLoading(true);
      
      const total = calculateTotalPrice(quantity, selectedDates);

      const cartData = {
        user: user._id,
        products: {
          product: product._id,
          quantity: quantity,
          price: parseFloat(product.price),
          subscriptionType: subscriptionType,
          deliveryDates: Object.keys(selectedDates),
          startDate: startDate
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
    <ScrollView>
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
      
      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>
              {product.old_price || product.price}
            </Text>
            <Text style={styles.currentPrice}>{product.price}</Text>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Qty:</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              editable={false}
              style={styles.quantityInput}
              value={quantity.toString()}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
      
      <Animatable.View animation="fadeInLeft" duration={800} delay={400} style={styles.deliveryOptionsContainer}>
        <Text style={styles.sectionTitle}>Select Delivery Option:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.optionButton, subscriptionType === 'daily' ? styles.selectedButton : null]}
            onPress={() => selectSubscriptionType('daily')}
          >
            <Text style={styles.buttonText}>Daily</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionButton, subscriptionType === 'alternative' ? styles.selectedButton : null]}
            onPress={() => selectSubscriptionType('alternative')}
          >
            <Text style={styles.buttonText}>Alternative</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionButton, subscriptionType === 'onetime' ? styles.selectedButton : null]}
            onPress={() => selectSubscriptionType('onetime')}
          >
            <Text style={styles.buttonText}>One Time</Text>
          </TouchableOpacity>
        </View>
        
        {Object.keys(selectedDates).length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>
              {subscriptionType === 'daily' ? 'Daily delivery' : 
               subscriptionType === 'alternative' ? 'Delivery on alternate days' : 
               'One-time delivery'}
              {' starting from '}{startDate}
            </Text>
            <Text style={styles.summaryText}>
              Total deliveries: {Object.keys(selectedDates).length}
            </Text>
            <Text style={styles.totalPrice}>
              Total Price: ₹{totalPrice.toFixed(2)}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.addToCartButton, (isLoading || !subscriptionType) ? styles.disabledButton : null]}
          onPress={handleAddToCart}
          disabled={isLoading || !subscriptionType}
        >
          <Text style={styles.addToCartButtonText}>
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={800} delay={600} style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </Animatable.View>
      
      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Text style={styles.calendarTitle}>
              {subscriptionType === 'daily' ? 'Select start date for daily delivery' : 
               subscriptionType === 'alternative' ? 'Select start date for alternate days' : 
               'Select delivery date'}
            </Text>
            <Calendar
              markedDates={selectedDates}
              onDayPress={handleDateSelect}
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                todayTextColor: '#fb752e',
                selectedDayBackgroundColor: '#fb752e',
                selectedDayTextColor: '#000000',
                arrowColor: '#fb752e',
              }}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => renderContent()}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    backgroundColor: '#fb752e',
  },
  productInfoContainer: {
    padding: 16,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  oldPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
    fontWeight: 'bold',
  },
  currentPrice: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 20,
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  deliveryOptionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#fb752e',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  summaryText: {
    marginBottom: 6,
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: '#fb752e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  addToCartButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'#fff'
  },
  descriptionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  descriptionText: {
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#fb752e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
});

export default ProductDetails;