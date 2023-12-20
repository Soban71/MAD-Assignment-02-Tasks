import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { CartContext } from '../../App'; // Ensure this path is correct

const Customer = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Item added to cart:', product);
  };

  return (
    <ScrollView contentContainerStyle={styles.customerContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer View</Text>
        <Button
          title="Cart"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          {product.image && (
            <Image source={{ uri: product.image }} style={styles.productImage} />
          )}
          <Text style={styles.productTitle}>{product.title}</Text>
          <View style={styles.productDetails}>
            <Text style={{ color:'#000000',}}>Price: ${product.price}</Text>
            <Text  style={{ color:'#000000',}}>Category: {product.category}</Text>
            <Button
              title="Add to Cart"
              onPress={() => handleAddToCart(product)}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  customerContainer: {
    color:'#000000',
    padding: 20,
  },
  productImage: {
    width: '100%', 
    height: 200, 
    resizeMode: 'cover',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    color:'#000000',
  },
  title: {
    color:'#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productTitle: {
    color:'#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDetails: {
    color:'#000000',
    marginTop: 10,
  },
});

export default Customer;
