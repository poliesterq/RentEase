import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Order} from '../shared/models/order';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderList() {
  const navigation = useNavigation();

  const [orders, setOrders] = useState<Order[]>([]);

  const handleOrderPress = (id: number) => {
    navigation.navigate('OrderDetails' as never, {id: id} as never);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const userValue = await AsyncStorage.getItem('id');
      const tokenValue = await AsyncStorage.getItem('access_token');

      const response = await fetch(
        'https://rentease-api.azurewebsites.net/api/Order/GetList',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenValue,
          },
          body: JSON.stringify({
            TenantId: userValue,
          }),
        },
      );

      if (response.ok) {
        const orders = await response.json();
        setOrders(orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {orders.length > 0 ? (
          <View style={styles.order}>
            {orders.map(order => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => handleOrderPress(order.id)}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{order.item.title}</Text>
                  <Image
                    style={styles.cardImage}
                    source={
                      order.item.imageUrl
                        ? {uri: order.item.imageUrl}
                        : require('rent_ease_mobile/assets/images/default-image.jpg')
                    }
                  />
                </View>
                <View style={styles.cardOrder}>
                  <Text style={styles.itemTitle}>Order</Text>
                  <Text style={styles.text}>
                    <Image
                      source={require('rent_ease_mobile/assets/images/calendar.png')}
                      style={styles.icon}
                    />
                    {new Date(order.dateFrom).toLocaleDateString()}
                    {' - '}
                    {new Date(order.dateTo).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    <Image
                      source={require('rent_ease_mobile/assets/images/pin.png')}
                      style={styles.icon}
                    />
                    {order.deliveryAddress}
                  </Text>
                  <Text style={styles.text}>
                    <Image
                      source={require('rent_ease_mobile/assets/images/check.png')}
                      style={styles.icon}
                    />
                    {order.isConfirmed
                      ? order.isDelivered
                        ? order.isFinished
                          ? 'Finished'
                          : 'Delivered'
                        : 'Confirmed'
                      : 'Not Confirmed'}
                  </Text>
                </View>

                <View style={styles.cardOrder}>
                  <Text style={styles.itemTitle}>Item</Text>
                  <Text style={styles.text}>
                    <Image
                      source={require('rent_ease_mobile/assets/images/pin.png')}
                      style={styles.icon}
                    />
                    {order.item.address}
                  </Text>
                  <Text style={styles.text}>
                    <Image
                      source={require('rent_ease_mobile/assets/images/dollar-symbol.png')}
                      style={styles.icon}
                    />
                    {order.item.priceUS}
                  </Text>
                  <Text style={styles.text}>
                    <Image
                      source={require('rent_ease_mobile/assets/images/hryvnia.png')}
                      style={styles.icon}
                    />
                    {order.item.priceUA}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.itemTitle}>There are no orders yet.</Text>
            <Text style={styles.text}>
              Please go to web version to place orders.
            </Text>
          </View>
        )}
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
    width: 50,
    height: 50,
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
