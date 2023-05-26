import React from 'react';
import LoginForm from './src/components/login-form';
// import Header from './src/components/header';
// import TaskListPage from './src/pages/task-list';
// import Navbar from './src/components/nav-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
let isLoggedIn = true;
export default function App() {
  return (
    <NavigationContainer>
      {/* <Header /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginForm} />
        {/* <Stack.Screen name="TaskList" component={TaskListPage} /> */}
      </Stack.Navigator>
      {/* {isLoggedIn && <Navbar />} */}
    </NavigationContainer>
  );
}