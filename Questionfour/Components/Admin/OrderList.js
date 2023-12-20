import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderList= () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.133.203/Labassignment/AdminOrder.php');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders Table</Text>
      <View style={styles.header}>
        <Text style={styles.cell}>Order ID</Text>
        <Text style={styles.cell}>Product ID</Text>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Address</Text>
        <Text style={styles.cell}>Card No</Text>
        <Text style={styles.cell}>Price</Text>
      </View>
      {orders.map((order) => (
        <View style={styles.row} key={order.orderId}>
          <Text style={styles.cell}>{order.orderId}</Text>
          <Text style={styles.cell}>{order.ProductId}</Text>
          <Text style={styles.cell}>{order.Name}</Text>
          <Text style={styles.cell}>{order.Address}</Text>
          <Text style={styles.cell}>{order.CardNo}</Text>
          <Text style={styles.cell}>{order.Price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default OrderList;
