import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

export default function Vieworders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Order ID</Text>
        <Text style={styles.headerText}>Customer Name</Text>
        <Text style={styles.headerText}>ProductID</Text>
        <Text style={styles.headerText}>Price</Text>

      </View>
      {orders.map((order, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.rowText}>{order.id}</Text>
          <Text style={styles.rowText}>{order.name}</Text>
          <Text style={styles.rowText}>{order.productIds}</Text>
          <Text style={styles.rowText}>{order.totalPrice}</Text>

         
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  rowText: {
    flex: 1,
    padding: 5,
  },
});
