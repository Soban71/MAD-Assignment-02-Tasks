import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { CartContext } from '../../App';

const Customer = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.133.203/Labassignment/fetchData.php');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Server Response:', responseText);

      const data = JSON.parse(responseText);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Item added to cart:', product);
  };

  return (
    <ScrollView contentContainerStyle={styles.customerContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer View</Text>
        <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
      {products.map((product, index) => (
        <View key={index} style={styles.productCard}>
          <Text>{product.productName}</Text>
          <Text>${product.Price}</Text>
          <Button
            title="Add to Cart"
            onPress={() => handleAddToCart(product)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  customerContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
});

export default Customer;
