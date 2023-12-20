import React,{useContext} from 'react'
import {View ,Text , TextInput , Button} from 'react-native'
import { Context2 } from '../App';
function UpdateCity({navigation}) {
    const context = useContext(Context2);
  return (
    <View>

      <Text>Update Country Information</Text>

      <TextInput placeholder="City" value={context.City}  onChangeText={(City)=>context.setCity(City)}  style={{borderWidth:1}}/>
      <TextInput placeholder="Country" value={context.Country}  onChangeText={(Country)=>context.setCountry(Country)}  style={{borderWidth:1}}/>

<Button title='Go Back'  onPress={() => navigation.navigate('Screen4')}/>

    </View>
  )
}

export default UpdateCity
