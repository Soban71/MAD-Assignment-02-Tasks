import React from 'react'
import { View, Text , Button} from'react-native'


function MainScreen({navigation}) {
  return (
    <View>
      <Text>Select Option you want</Text>

      <Button title="Screen1" onPress={() => navigation.navigate('Screen1')} />
      <Button title="Screen2" onPress={() => navigation.navigate('Screen2')} />
     <Button title="Screen3" onPress={() => navigation.navigate('Screen3')} />
    <Button title="Screen4" onPress={() => navigation.navigate('Screen4')} />
    </View>
  )
}

export default MainScreen
