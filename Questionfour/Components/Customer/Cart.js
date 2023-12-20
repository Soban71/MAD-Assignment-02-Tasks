import React, { useContext } from 'react';
import { CartContext } from '../../App';
import { View, Text, Button, StyleSheet } from 'react-native';

const ShoppingCart = ({ navigation }) => {
  const { cart, removeFromCart } = useContext(CartContext);

  let totalPrice = 0;

  for (const item of cart) {
    const itemPrice = parseFloat(item.Price);
    if (isNaN(itemPrice)) {
      totalPrice += 0;
    } else {
      totalPrice += itemPrice;
    }
    
  }
  
  totalPrice = totalPrice.toFixed(2);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart && cart.length > 0 ? (
        cart.map(item => (
          <View key={item.productid} style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.productName}</Text>
              <Text style={styles.itemPrice}>${item.Price}</Text>
            </View>
            <Button
              title='Remove'
              onPress={() => removeFromCart(item.productid)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      )}
      <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
      <Button title='CheckOut'  onPress={() => navigation.navigate('orderfinals', { cart ,totalPrice })} />
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
  },
  emptyCart: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default ShoppingCart;
