import React,{useContext} from 'react'
import {View , Text , Button} from 'react-native'
import { Context2 } from '../App'
function Screen4({navigation}) {

  const context1 = useContext(Context2);

  const {City , Country}=context1
  return (
    <View>
      <Text>{City}</Text>
      <Text>{Country}</Text>

      <Button title='update'  onPress={() => navigation.navigate('Update2')}  />
    </View>
  )
}

export default Screen4