import React, { useContext } from 'react';
import { View, Text  , Button} from 'react-native';
import { Context1 } from '../App';

function Screen2({navigation}) {
  const context = useContext(Context1);

  const { Name, Registration } = context;

  return (
    <View>
      <Text>Welcome to Screen 1</Text>
      <Text>Name: {Name}</Text>
      <Text>Registration: {Registration} </Text>

      <Button title='update' onPress={() => navigation.navigate('Update1')} />
    </View>
  );
}



export default Screen2
