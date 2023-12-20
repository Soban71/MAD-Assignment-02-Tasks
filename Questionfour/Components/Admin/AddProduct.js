import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://192.168.133.203/Labassignment/setdata.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          productDescription: productDescription,
          productPrice: productPrice,
        }),
      });

      const responseText = await response.text();
      console.log('Server Response:', responseText);

      try {
        const json = JSON.parse(responseText);
        console.warn(json['Message']);

        if (json['Message'] === 'New record created successfully') {
          Alert.alert('Success', 'Product added successfully');
        }
      } catch (jsonError) {
        console.log('Error parsing JSON response:', jsonError);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      
    }

    setProductName('');
    setProductDescription('');
    setProductPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput style={styles.input} placeholder="Product Name" value={productName} onChangeText={setProductName} />
      <TextInput style={styles.input} placeholder="Product Description" value={productDescription} onChangeText={setProductDescription} />
      <TextInput style={styles.input} placeholder="Product Price" value={productPrice} onChangeText={setProductPrice} keyboardType="numeric" />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 10 },
  addButton: { backgroundColor: '#3498db', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddProduct;
