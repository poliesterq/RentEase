import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Order} from '../shared/models/order';

export default function OrderDetails() {
  const navigation = useNavigation();

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userValue = await AsyncStorage.getItem('id');
        // const tokenValue = await AsyncStorage.getItem('access_token');

        // setUser(userValue  '');
        // setToken(tokenValue  '');
        await getOrder();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getOrder = async () => {
    try {
      const response = await fetch(
        `https://rentease-api.azurewebsites.net/api/Order/${1}`,
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMzA5NWE4Mi0yNmNhLTQ2ODYtOWI1OS05OWQ5OGY1MGYxYTIiLCJlbWFpbCI6InNhc2hhLmR0cnl1a292YUBudXJlLnVhIiwiaWQiOiJmZjE4MTYwYi1kZWRlLTRlOGMtODYxOC0xYTRmNDhmYjFjYzYiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTY4NTE5MTI0MiwiZXhwIjoxNjg1Mjc3NjQyLCJpYXQiOjE2ODUxOTEyNDJ9.SpY41DLB5dWyjUUX6ZthlRJIx1eKB_kH6_hcvXYSkc8',
          },
        },
      );
      if (response.ok) {
        const order = await response.json();
        setOrder(order);
        console.warn(order);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders details</Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.orderCard}>
          <Text style={styles.itemTitle}>{order?.item.title}</Text>
          <Text style={styles.text}> status add stepper </Text>
        </View>

        <View style={styles.orderCard}>
          <Text style={styles.itemTitle}>Details</Text>
          {/* <Text style={styles.text}>
                <Image
                  source={require('rent_ease_mobile/assets/images/calendar.png')}
                  style={styles.icon}
                />
                {order?.dateFrom?.toLocaleDateString()}
                {' - '}
                {order?.dateTo?.toLocaleDateString()}
              </Text> */}
          <Text style={styles.text}>
            <Image
              source={require('rent_ease_mobile/assets/images/pin.png')}
              style={styles.icon}
            />
            {order?.deliveryAddress}
          </Text>
        </View>
        <View style={styles.orderCard}>
          <Text style={styles.itemTitle}>Item</Text>
          <Text style={styles.text}>{order?.item.category}</Text>
          <Image
            style={styles.cardImage}
            source={
              order?.item.imageUrl
                ? {uri: order.item.imageUrl}
                : require('rent_ease_mobile/assets/images/default-image.jpg')
            }
          />
          <Text style={styles.text}>
            <Image
              source={require('rent_ease_mobile/assets/images/description.png')}
              style={styles.icon}
            />
            {order?.item.description}
          </Text>
          <Text style={styles.text}>
            <Image
              source={require('rent_ease_mobile/assets/images/pin.png')}
              style={styles.icon}
            />
            {order?.item.address}
          </Text>
          <Text style={styles.text}>
            <Image
              source={require('rent_ease_mobile/assets/images/dollar-symbol.png')}
              style={styles.icon}
            />
            {'10'}
          </Text>
          <Text style={styles.text}>
            <Image
              source={require('rent_ease_mobile/assets/images/hryvnia.png')}
              style={styles.icon}
            />
            {'100'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff6f4',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a0e91',
  },
  order: {
    flex: 1,
    gap: 20,
  },
  orderCard: {
    padding: 10,
    backgroundColor: '#fff0ee',
    shadowColor: 'black',
    shadowOffset: {height: 30, width: 30},
    borderRadius: 5,
    elevation: 3,
    width: 300,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a0e91',
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  cardOrder: {
    marginHorizontal: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: 'black',
    marginBottom: 5,
  },
  scroll: {
    paddingHorizontal: 20,
  },
});
