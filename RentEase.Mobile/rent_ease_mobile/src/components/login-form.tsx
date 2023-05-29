import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const login = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        'https://rentease-api.azurewebsites.net/api/Identity/Login',
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

        const decodedToken = jwtDecode(result.token);
        
        await AsyncStorage.setItem('access_token', result.token);
        await AsyncStorage.setItem('id', decodedToken.id);

        navigation.navigate('OrderList' as never);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
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
    color: '#1a0e91',
  },
});
