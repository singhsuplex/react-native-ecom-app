import React, { useRef, useState, useEffect } from 'react';
import "./global.css";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text } from 'react-native';
import ProductDetails from './src/components/ProductDetails';
import Home from './src/screens/Home';
import Checkout from './src/components/Checkout';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Footer from './src/components/Footer';
import About from './src/components/About';
import Contact from './src/components/Contact';
import Profile from './src/components/Profile';
import Sidebar from './src/components/Sidebar';
import Order from './src/components/Order';
import Onboarding from './src/components/Onboarding';
import TrackOrder from './src/components/TrackOrder';
import VerifyOtp from './src/components/VerifyOtp';
import Payment from './src/components/Payment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import AgentLogin from './src/components/AgentLogin';
import AgentDashboard from './src/components/AgentDashboard';
import ChangeDetails from './src/components/ChangeDetails';
import AllProducts from './src/components/AllProducts';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack navigator for main flow
const HomeStack = ({ onRouteChange }) => (
  <Stack.Navigator
    screenListeners={{
      state: (e) => {
        const route = e.data.state.routes[e.data.state.index];
        onRouteChange(route.name);
      },
    }}
  >
    <Stack.Screen
      name="Onboarding"
      component={Onboarding}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Checkout"
      component={Checkout}
      options={{ title: 'Cart Details' }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'User Login',
        headerStyle: {
          backgroundColor: '#fff',
        },
        // headerRight: () => {
        //   const navigation = useNavigation();
        //  return (
        //     <TouchableOpacity 
        //       style={{ marginRight: 0 }} 
        //       onPress={() => navigation.navigate('HomeStack', { screen: 'AgentLogin' })}
        //     >
        //       <Text className='border border-[#461a01] text-[#461a01] font-bold rounded-full px-4 py-2'>Agent Login</Text>
        //     </TouchableOpacity>
        //   );
        // }
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ title: 'User Registration' }}
    />
    <Stack.Screen
      name="Order"
      component={Order}
      options={{ title: 'My Orders' }}
    />
    <Stack.Screen
      name="TrackOrder"
      component={TrackOrder}
      options={{ title: 'Orders Detail' }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen
      name="AgentDashboard"
      component={AgentDashboard}
      options={{ 
        title: 'Agent Dashboard',
        headerStyle: {
          backgroundColor: '#ffde59',
        },
       }}
    />
    <Stack.Screen
      name="VerifyOtp"
      component={VerifyOtp}
      options={{
        title: 'Verify OTP',
        // headerStyle: {
        //   backgroundColor: '#ffde59',
        // },
      }}
    />
    <Stack.Screen
      name="AgentLogin"
      component={AgentLogin}
      options={{
        title: 'Agent Login',
        headerStyle: {
          backgroundColor: '#ffde59',
        },
    
      }}
    />
    <Stack.Screen
      name="Payment"
      component={Payment}
      options={{ title: 'Payment' }}
    />

    <Stack.Screen
      name="ChangeDetails"
      component={ChangeDetails}
      options={{ title: 'Change Details' }}
    />

    <Stack.Screen
      name="AllProducts"
      component={AllProducts}
      options={{ title: 'All Products' }}
    />

  </Stack.Navigator>
);

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('');

  const handleRouteChange = (routeName) => {
    setCurrentRoute(routeName);
  };
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <Sidebar {...props} />}
            screenOptions={{
              drawerStyle: {
                width: '80%',
              },
            }}
          >
            <Drawer.Screen
              name="HomeStack"
              options={{
                headerShown: false,
                drawerLabel: 'Home',
              }}
            >
              {(props) => <HomeStack {...props} onRouteChange={handleRouteChange} />}
            </Drawer.Screen>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Contact" component={Contact} />
          </Drawer.Navigator>
          {/* Conditional Footer */}
          {!['Onboarding', 'VerifyOtp', 'Login', 'AgentLogin', 'AgentDashboard'].includes(currentRoute) && (
            <View className="fixed bottom-0">
              <Footer />
            </View>
          )}

        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
