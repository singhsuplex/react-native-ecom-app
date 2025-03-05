import React, { useState, useRef, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { loginDetails } from '../core/features/loginSlice';

const VerifyOtp = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { email } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const showSuccessAlert = (userName) => {
        Alert.alert(
            "Success",
            `Welcome back ${userName}!`,
            [
                { 
                    text: "OK", 
                    onPress: () => navigation.navigate('HomeStack', { screen: 'HomeScreen' })
                }
            ]
        );
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'https://maa-tulya-ecom-mern-backend-app.onrender.com/api/auth/login',
                {
                    email: email,
                    password: otpString  // Changed from otp to password to match API expectations
                }
            );
            
        //    console.log('dataaaa................ ', response.data.user);
            
        //    dispatch(loginDetails(response.data.user))

            // Check if we have the token and user data
            if (response.data.token && response.data.user) {
                // You might want to store the token for future API calls
                // await AsyncStorage.setItem('userToken', response.data.token);
                // await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
                dispatch(loginDetails({
                    token: response.data.token,
                    user: response.data.user
                }));    
                
                showSuccessAlert(response.data.user.name);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            console.log('Error details:', error.response?.data);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setLoading(true);
            // Add your resend OTP API endpoint here
            // await axios.post('YOUR_RESEND_OTP_ENDPOINT', { email });
            Alert.alert("Success", "New OTP has been sent to your email");
        } catch (error) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#ffde59]">
            <View className="flex-1 px-6 pt-32">
                {/* Header */}
                <Animatable.View animation="fadeInDown" duration={1500} className="items-center mb-12">
                    <Text className="text-3xl font-bold text-[#461a01]">Verify OTP</Text>
                    <Text className="text-[#461a01] mt-6 text-center">
                        Please enter the 6-digit verification code sent to {email}
                    </Text>
                </Animatable.View>

                {/* OTP Input */}
                <Animatable.View animation="fadeIn" delay={1000} className="mb-8">
                    <View className="flex-row justify-between px-6">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                className={`w-12 h-12 border ${
                                    error ? 'border-red-500' : 'border-[#461a01]'
                                } rounded-lg text-white text-center text-xl font-bold bg-[#461a01]`}
                                maxLength={1}
                                keyboardType="number-pad"
                                value={otp[index]}
                                onChangeText={(value) => handleOtpChange(value, index)}
                                onKeyPress={(event) => handleKeyPress(event, index)}
                                editable={!loading}
                                secureTextEntry={true}  // Added for security
                            />
                        ))}
                    </View>
                    {error ? (
                        <Animatable.Text animation="shake" className="text-red-500 mt-2 text-center">
                            {error}
                        </Animatable.Text>
                    ) : null}
                </Animatable.View>

                {/* Verify Button */}
                <Animatable.View animation="zoomIn" className='flex-row justify-center' delay={1500}>
                    <TouchableOpacity
                        className={`bg-[#461a01] w-1/2 rounded-lg py-4 items-center shadow-md ${
                            loading ? 'opacity-50' : ''
                        }`}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        <Text className="text-white text-lg font-bold">
                            {loading ? 'Verifying...' : 'Verify'}
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>

                {/* Resend Option */}
                <Animatable.View animation="fadeInUp" delay={2000} className="mt-8 items-center">
                    <Text className="text-[#461a01]">Didn't receive the code?</Text>
                    <TouchableOpacity 
                        className="mt-4" 
                        onPress={handleResendOtp}
                        disabled={loading}
                    >
                        <Text className={`text-[#461a01] font-bold ${loading ? 'opacity-50' : ''}`}>
                            Resend OTP
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </SafeAreaView>
    );
};

export default VerifyOtp;