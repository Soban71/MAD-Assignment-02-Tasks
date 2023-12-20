import React, {useContext, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {CartContext} from '../../App'; 

const ShoppingCart = ({navigation}) => {
  const {cart, removeFromCart} = useContext(CartContext);
  const [price,setPrice]=useState(0);
  var temp=0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart && cart.length > 0 ? (
        cart.map(item => ( 
       
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText} >
              {item.name} - ${item.price}
            </Text>

            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        ))
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
      <Button
        title="Checkout"
        onPress={() => navigation.navigate('orderfinals', {cart})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000000',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color:'#000000'
  },
  emptyCartText: {
    color:'#000000',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default ShoppingCart;
