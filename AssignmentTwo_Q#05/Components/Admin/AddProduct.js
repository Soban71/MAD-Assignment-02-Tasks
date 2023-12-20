import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = () => {
  
  const [productTitle, setProductTitle] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

 
  const handleImagePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      if (result.uri) {
        setProductImage(result.uri);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.error("Error picking image:", error);
      }
    }
  };

  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const uploadImageToStorage = async (blob, path) => {
    const storage = getStorage();
    const ref = storageRef(storage, path);
    await uploadBytes(ref, blob);
    return await getDownloadURL(ref);
  };

  const handleAddProduct = async () => {
    try {
      let imageUrl = null;
      if (productImage) {
        const blob = await uriToBlob(productImage);
        imageUrl = await uploadImageToStorage(blob, `products/${Date.now()}_${productTitle}`);
      }

      const docRef = await addDoc(collection(db, 'products'), {
        title: productTitle,
        category: productCategory,
        price: productPrice,
        image: imageUrl,
      });

      console.log('Product added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Title"
        value={productTitle}
        onChangeText={text => setProductTitle(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Category"
        value={productCategory}
        onChangeText={text => setProductCategory(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
        keyboardType="numeric"
      />

      {productImage && <Image source={{ uri: productImage }} style={styles.productImage} />}

      <TouchableOpacity style={styles.addButton} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Pick Product Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProduct;
