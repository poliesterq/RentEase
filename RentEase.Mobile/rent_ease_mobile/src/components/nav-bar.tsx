import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Navbar = () => {
    const navigation = useNavigation();

  const logout = async () => {
    navigation.navigate('Login' as never);
  };
  const orderList = async () => {
    navigation.navigate('OrderList' as never);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={orderList}>
        <Image source={require('rent_ease_mobile/assets/images/left-arrow.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Image source={require('rent_ease_mobile/assets/images/logout.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff6f4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10
  },
  icon: {
    width: 50,
    height: 50,
    maxHeight: 24,
    maxWidth: 24
  },
});

export default Navbar;