import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './Components/Screen1';
import Screen2 from './Components/Screen2';
import Screen3 from './Components/Screen3';
import Screen4 from './Components/Screen4';
import MainScreen from './Components/MainScreen';
import updatePerson from './Components/UpdatePerson';
import UpdateCity from './Components/UpdateCity';

const Stack = createNativeStackNavigator();

export const Context1 = React.createContext();
export const Context2 = React.createContext()

function App() {
  const contextInitialValue = {
    Name: "Babar Azam",
    Registration: "020",
  };

  const contextInitialValue2 = {
    City : "Lahore",
    Country : "Pakistan",
  }

  const [contextValue, setContextValue] = useState(contextInitialValue);
  const [contextValue2, setContextValue2] = useState(contextInitialValue2);

  const context1setter = {
    setName,
    setRegistration,
  };


  const context2setter = {
    setCity,
    setCountry,
  };

  function setCity(City) {
    const newCity = {...contextValue2, City };
    setContextValue2(newCity);
  }

  function setCountry(Country) {
    const newCountry = {...contextValue2, Country };
    setContextValue2(newCountry);
  }
  function setName(Name) {
    const newName = { ...contextValue, Name };
    setContextValue(newName);
  }

  function setRegistration(Registration) {
    const newRegistration = { ...contextValue, Registration };
    setContextValue(newRegistration);
  }

  return (
    <Context1.Provider value={{ ...contextValue, ...context1setter }}>
    <Context2.Provider value={{...contextValue2 , ...context2setter}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
          <Stack.Screen name="Screen4" component={Screen4} />
          <Stack.Screen name="Update1" component={updatePerson} />
          <Stack.Screen name="Update2" component={UpdateCity} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context2.Provider>
  </Context1.Provider>
  );
}

export default App;
