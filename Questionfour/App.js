import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/MainPage';
import MainMenu from './Components/Admin/Mainmenu';
import AddProduct from './Components/Admin/AddProduct';
import CustomerMenu from './Components/Customer/Customer';
import ShoppingCart from './Components/Customer/Cart';
import Confirm_Order from './Components/Customer/Confirm_Order';
import GetStarted from './Components/GetStarted';
import OrderList from './Components/Admin/OrderList';

const Stack = createNativeStackNavigator();

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log('Updated cart:', updatedCart);
      return updatedCart;
    });
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productid !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
    {children}
  </CartContext.Provider>
  
  );
};

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={GetStarted} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Customer" component={CustomerMenu} />
          <Stack.Screen name="Admin" component={MainMenu} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="Cart" component={ShoppingCart} />
          <Stack.Screen name="List" component={OrderList} />
          <Stack.Screen name="orderfinals" component={Confirm_Order} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
