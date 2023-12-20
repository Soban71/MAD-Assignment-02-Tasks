import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Confirm_Order = ({ route }) => {
  const { cart } = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const {totalPrice} = route.params;


  const productIds = cart.map(item => item.productid).join(',');

  const confirmOrder = async () => {
    try {
      const response = await fetch('http://192.168.133.203/Labassignment/confirmOrder.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds,
          name,
          address,
          cardNumber,
          totalPrice,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, ${errorText}`);
        return;
      }
  
      const result = await response.json();
      console.log(result);
      setName('');
      setAddress('');
      setCardNumber('');
      Alert.alert('Order Confirmed');
    } catch (error) {
      console.error('Error confirming order:', error.message);
    }
  };
  
     

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Order</Text>

      <TextInput
        style={styles.input}
        placeholder={`Product IDs: ${productIds}`}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      
      
<TextInput
  style={styles.input}
  placeholder="Price"
  value={totalPrice} 
  editable={false} 
/>


      <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Confirm_Order;
