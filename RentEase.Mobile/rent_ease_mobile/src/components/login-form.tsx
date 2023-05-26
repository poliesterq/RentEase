import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleLogin = async () => {
    const user = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch(
        'https://localhost:7277/api/Identity/Login',
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
        // navigation.navigate('TaskList');
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
      <Button title="Submit" onPress={handleLogin} color="#41644a" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9ccc5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#41644a',
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderColor: '#41644a',
    color: '#41644a',
  },
});