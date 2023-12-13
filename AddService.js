import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Image,Text } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleChooseImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      setImage(uri);
    }
  };

  const handleSaveService = async () => {
    const firestore = getFirestore();
    try {
      // Thêm dữ liệu vào Firestore
      const docRef = await addDoc(collection(firestore, 'Service'), {
        ServiceName: serviceName,
        price: price,
        image: image ? image : null,
      });
      window.alert('Lưu thành công!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu', error.message);
      window.alert('Lỗi', 'Đã có lỗi xảy ra khi lưu dữ liệu.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Tên lá bài:</Text>
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setServiceName(text)}
      />
      <Text style={{ fontSize: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Giá:</Text>
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPrice(text)}
      />
      <TouchableOpacity onPress={handleChooseImage} style={{ flexDirection: 'row', alignSelf: 'center'  }}>
      <Icon name="camera" size={20} color="black" style={{ marginRight: 8 }} />
      <Text>Upload Image</Text>
     </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 300,alignSelf:'center' }} />}
        <Button title="Lưu" onPress={handleSaveService} />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex:1,
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default AddService;
