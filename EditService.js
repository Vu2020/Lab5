import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
const EditService = ({ route }) => {
  const { id, ServiceName: initialServiceName, price: initialPrice, image: initialImage } = route.params;
  const navigation = useNavigation();
  const [serviceName, setServiceName] = useState(initialServiceName);
  const [price, setPrice] = useState(initialPrice);
  const [editedImage, setEditedImage] = useState(initialImage); // State for edited image

  const handleSaveEdit = async () => {
    try {
      const db = getFirestore();
      const serviceDocRef = doc(db, 'Service', id);
      await updateDoc(serviceDocRef, {
        ServiceName: serviceName,
        price: price,
        image: editedImage,
      });
      window.alert('Cập nhật thành công!');
      navigation.navigate('ServiceDetail', {
        id: id,
        ServiceName: serviceName,
        price: price,
        image: editedImage,
      });
    } catch (error) {
      window.alert(`Lỗi khi cập nhật dịch vụ: ${error.message}`);
    }
  };

  const handleChooseImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      setEditedImage(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Tên lá bài:</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />

      <Text style={{ fontSize: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Giá:</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <TouchableOpacity onPress={handleChooseImage} style={{ flexDirection: 'row', alignSelf: 'center'  }}>
      <Icon name="camera" size={20} color="black" style={{ marginRight: 8 }} />
      <Text>Upload Image</Text>
      </TouchableOpacity>
      {editedImage ? (
        <Image source={{ uri: editedImage }} style={{ width: 200, height: 300, alignSelf: 'center' ,marginBottom: 8}} />
      ) : (
        <Image source={{ uri: initialImage }} style={{ width: 200, height: 300, alignSelf: 'center',marginBottom: 8 }} />
      )}
      <Button title="Lưu" onPress={handleSaveEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default EditService;
