import React,{useContext} from 'react'
import {View , Text} from 'react-native'
import { Context2 } from '../App'
function Screen3() {

  const context1 = useContext(Context2);

  const {City , Country}=context1
  return (
    <View>
      <Text>{City}</Text>
      <Text>{Country}</Text>
    </View>
  )
}

export default Screen3