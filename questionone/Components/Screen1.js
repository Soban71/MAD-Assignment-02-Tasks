import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Context1 } from '../App';

function Screen1() {
  const context = useContext(Context1);

  const { Name, Registration } = context;

  return (
    <View>
      <Text>Welcome to Screen 1</Text>
      <Text>Name: {Name}</Text>
      <Text>Registration: {Registration} </Text>
    </View>
  );
}

export default Screen1;
