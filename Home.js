import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [index, setIndex] = useState(0); 
  const fetchData = useCallback(async () => {
    const db = getFirestore();
    try {
      const snapshot = await getDocs(collection(db, 'Service'));
      const dataList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ServiceName: doc.data().ServiceName,
        price: doc.data().price,
        image: doc.data().image,
      }));
      setData(dataList);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ Firestore', error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, isFocused]);

  const handleAddService = () => {
    navigation.navigate('AddService');
  };

  const handleServiceDetail = (id, ServiceName, price, image) => {
    navigation.navigate('ServiceDetail', { id, ServiceName, price, image });
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error(`Lỗi đăng xuất: ${error.message}`);
    }
    setShowLogoutConfirmation(false);
  };

  const showConfirmationDialog = () => {
    window.alert('Xác nhận đăng xuất\nBạn có chắc muốn đăng xuất?');
    handleLogout();
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowLogoutConfirmation(true)} style={styles.headerRight}>
          <Ionicons name="person-circle-outline" size={32} color="blue" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, showLogoutConfirmation]);

  return (
    <View style={styles.container}>
      <Image source={require('./logoyugioh.png')} style={{ width: 250, height: 80, alignSelf: 'center' }} />
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách lá bài</Text>
        <TouchableOpacity onPress={handleAddService}>
          <Ionicons name="add-circle-outline" size={32} color="blue" />
        </TouchableOpacity>
      </View>

      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleServiceDetail(item.id, item.ServiceName, item.price, item.image)}
        >
          <View style={styles.serviceItem}>
            <Text style={styles.serviceName}>{item.ServiceName}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {showLogoutConfirmation && showConfirmationDialog()}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  headerRight: {
    marginRight: 16,
  },
});

export default Home;
