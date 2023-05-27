import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import axios, {AxiosError} from 'axios';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const login = async () => {
    try {

        navigation.navigate('OrderList' as never);
    //   const response = await axios.get('https://stackoverflow.com/'); // Replace with your API endpoint
    //   const data = response.data;
    //   // Handle the response data
    //   console.error('try', data);
    } catch (error) {
      // Handle the error
      console.error('catch', error);
    }
  };

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    console.error('response.ok');

    try {
      const response = await fetch(
        'https://192.168.0.109:7129/api/Identity/Login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );

      if (response.ok) {
        const result = await response.json();
        // Handle successful login
        // await AsyncStorage.setItem('access_token', result.token);
        // await AsyncStorage.setItem('id', result.id);
        // await AsyncStorage.setItem('email', result.email);
        // await AsyncStorage.setItem('role', result.role);

        // Navigate to the TaskList screen
        // navigation.navigate('TaskList' as never);
      } else {
        // Handle login error
        console.error('Login failed');
        // Show an error message to the user
      }
    } catch (error) {
      // Handle network error
      console.error(error);
      // Show an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('rent_ease_mobile/assets/images/rent.png')} /> */}
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={login} color="#fe7062" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff6f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a0e91',
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderColor: '#575ef7',
    color: '#41644a',
  },
});
