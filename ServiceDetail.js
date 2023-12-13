import React, { useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { IconButton, Portal,Paragraph,Dialog,Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
const ServiceDetail = ({ route }) => {
  const { id, ServiceName, price, image ,handleDeleteService} = route.params;
  const navigation = useNavigation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleThreeDotsPress = () => {
    setConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      const db = getFirestore();
      const serviceDocRef = doc(db, 'Service', id);
      await deleteDoc(serviceDocRef);
      window.alert('Xóa thành công!');
      navigation.navigate('Home');
      if (handleDeleteService) {
        handleDeleteService();
      }
    } catch (error) {
      window.alert('Lỗi', `Lỗi khi xóa dịch vụ: ${error.message}`);
    } finally {
      setConfirmDelete(false);
    }
  };
  const handleEdit =()=>{
    navigation.navigate('EditService', {
      id: id,
      ServiceName: ServiceName,
      price: price,
      image: image,
    });
  }
  const closeDialog = () => {
    setConfirmDelete(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="dots-vertical" onPress={handleThreeDotsPress} />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}><Text style={{ fontWeight: 'bold' }}>Tên lá bài:</Text> {ServiceName}</Text>
      <Text style={{fontSize: 20}}><Text style={{ fontWeight: 'bold' }}>Giá:</Text> {price}</Text>
      <Image source={{ uri: image }} style={{ width: 200, height: 300, alignSelf: 'center', marginBottom: 8 }} />
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Sửa</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={confirmDelete} onDismiss={closeDialog}>
          <Dialog.Title>Xác nhận xóa</Dialog.Title>
          <Dialog.Content> 
            <Paragraph>Xác nhận xóa dịch vụ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog} >Hủy</Button>
            <Button onPress={handleDelete} >Xóa</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex:1,
   
  },
  button: {
    backgroundColor: '#0099FF', 
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default ServiceDetail;
