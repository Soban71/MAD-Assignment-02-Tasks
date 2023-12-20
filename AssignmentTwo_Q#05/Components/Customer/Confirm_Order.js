import React, { useState ,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

const Confirm_Order = ({ route }) => {
  const { cart } = route.params;
  const productIds = cart.map(item => item.id).join(', ');
  useEffect(() => {
    let newTotal = 0;
    cart.forEach(item => {
      newTotal += parseInt(item.price, 10); 
    });
    setTotalPrice(newTotal);
  }, [cart]);
  

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);


  const handleConfirmOrder = async () => {
    try {
    
      const docRef = await addDoc(collection(db, 'orders'), {
        name,
        address,
        cardNumber,
        totalPrice,
        productIds,
       
      });

      console.log('Order confirmed with ID: ', docRef.id);
      Alert.alert("Order confirmed with ID: ",docRef.id);
      setName('');
      setAddress('');
      setCardNumber('');
    } catch (error) {
      console.error('Error confirming order: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Order</Text>
      <TextInput
        style={styles.input}
        value={`Product IDs: ${productIds}`}
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
        keyboardType="numeric"
      />

<TextInput
        style={styles.input}
        placeholder="Price"
        value={totalPrice.toString()}
        editable={false} 
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
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
    color: '#000000',
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
