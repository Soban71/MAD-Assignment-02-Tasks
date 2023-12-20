import React , {useContext}from 'react'
import { View, Text ,TextInput, Button} from'react-native'
import { Context1 } from '../App';
function updatePerson({navigation}) 
{

    const context = useContext(Context1);
 
  return (
    <View>
      <Text>Update Value</Text>
<TextInput placeholder="Name" value={context.Name}  onChangeText={(Name)=>context.setName(Name)}  style={{borderWidth:1}}/>
<TextInput placeholder="Registration" value={context.Registration} onChangeText={(Registration)=>context.setRegistration(Registration)}  style={{borderWidth:1}}/>

<Button title='Go Back'  onPress={() => navigation.navigate('Screen2')}/>

    </View>
  )
}

export default updatePerson
