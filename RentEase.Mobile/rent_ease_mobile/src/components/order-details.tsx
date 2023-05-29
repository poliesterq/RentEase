import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';

import {Order} from '../shared/models/order';
import {Category} from '../shared/enums/category.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  route: { params: { id: number } };
};

const OrderDetails: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    getOrder();
  }, []);

  
  const getOrder = async () => {
    try {      
      const tokenValue = await AsyncStorage.getItem('access_token');

      const response = await fetch(
        `https://rentease-api.azurewebsites.net/api/Order/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + tokenValue,
          },
        },
      );
      if (response.ok) {
        const order = await response.json();
        setOrder(order);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders details</Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.details}>
          <View style={styles.orderCard}>
            <Text style={styles.itemTitle}>{order?.item.title}</Text>
            <View style={styles.progressPic}>
              <Image
                source={require('rent_ease_mobile/assets/images/check-mark.png')}
                style={styles.icon}
              />
              <Text style={styles.textProgress}> — </Text>

              <Image
                source={order?.isConfirmed ? require('rent_ease_mobile/assets/images/check-mark.png') : require('rent_ease_mobile/assets/images/circle-2.png')}
                style={styles.icon}
              />
              <Text style={styles.textProgress}> — </Text>

              <Image
                source={order?.isDelivered ? require('rent_ease_mobile/assets/images/check-mark.png') : require('rent_ease_mobile/assets/images/circle-3.png')}
                style={styles.icon}
              />
              <Text style={styles.textProgress}> — </Text>

              <Image
                source={order?.isFinished ? require('rent_ease_mobile/assets/images/check-mark.png') : require('rent_ease_mobile/assets/images/circle-4.png')}
                style={styles.icon}
              />
            </View>
            <View style={styles.progress}>
              <Text style={styles.text}>Created</Text>
              <Text style={styles.text}>Confirmed</Text>
              <Text style={styles.text}>Delivered</Text>
              <Text style={styles.text}>Finished</Text>
            </View>
          </View>

          <View style={styles.orderCard}>
            <Text style={styles.itemTitle}>Details</Text>
            <Text style={styles.text}>
              <Image
                source={require('rent_ease_mobile/assets/images/calendar.png')}
                style={styles.icon}
              />
              {order && (
                <>
                  {new Date(order.dateFrom).toLocaleDateString()}
                  {' - '}
                  {new Date(order.dateTo).toLocaleDateString()}
                </>
              )}
            </Text>
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
            <Text style={styles.text}>
              {order && Category[order.item.category]}
            </Text>
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
    marginHorizontal: 40,
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
  details: {
    flex: 1,
    gap: 15,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textProgress: {
    color: '#fe7062'
  },
  progressPic: {
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default OrderDetails;