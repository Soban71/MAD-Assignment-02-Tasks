import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'MainUser',
});

function Search() {
  const [value, setValue] = useState('')
  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [Address, setAddress] = useState('');
  const [Id , setId] =useState()
  

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Data (Id INTEGER PRIMARY KEY , Name TEXT, Age TEXT, Address TEXT);',
        [],
        (_, result) => {
          console.log('Table created successfully');
       //   console.log(result);
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  };

  const insertData = () => {
    const id= 2000 ;
    const name = 'Muhammad Soban Rasheed';
    const age = '29';
    const address = '123 Main Street 22 Rawalpindi';

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Data (Id ,Name, Age, Address) VALUES (?,?, ?, ?);',
        [id ,name, age, address],
        (_, result) => {
          console.log('Data inserted successfully');
        },
        (_, error) => {
          console.error('Error inserting data:', error);
        }
      );
    });
  };

  const searchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT Name, Age, Address FROM Data WHERE Id = ?;',
        [parseInt(value)],
        (_, { rows }) => {
          if (rows.length > 0) {
            const userData = rows.item(0);
            setId(userData.Id);
            setName(userData.Name);
            setAge(userData.Age);
            setAddress(userData.Address);
          } else {
            setName('');
            setAge('');
            setAddress('');
            console.log('No data found for the given ID');
          }
        },
        (_, error) => {
          console.error('Error searching data:', error);
        }
      );
    });
  };
  

  const handleSearch = () => {
    searchData();
  };

  return (
    <View>
      <Text>Search Screen</Text>
      <View>
        <Text style={styles.Text}>Enter your id</Text>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your id'
          onChangeText={(text) => setValue(text)}
        />
      </View>
      <Button title='Insert' onPress={insertData} />
      <Button title='Search' onPress={handleSearch} />
      <Text>ID: {Id}</Text>
      <Text>Name: {Name}</Text>
      <Text>Age: {Age}</Text>
      <Text>Address: {Address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 400,
  },
});

export default Search;