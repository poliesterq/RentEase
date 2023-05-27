import React from 'react';
import LoginForm from './src/components/login-form';
import Navbar from './src/components/nav-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderList from './src/components/order-list';
import OrderDetails from './src/components/order-details';

const Stack = createNativeStackNavigator();
let isLoggedIn = true;
export default function App() {
  return (
    <NavigationContainer>
      {isLoggedIn && <Navbar />}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}