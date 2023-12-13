import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
//import Register from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import Home from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; 
import KeyIcon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const handleLogin = async () => {
    if (email.trim() === '') {
      setError("Email is required field");
      return;
    }
  
    if (password.trim() === '') {
      setError("Password is required field");
      return;
    }
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login success');
      navigation.navigate('HomeTab');
    } catch (error) {
      setError(`Lỗi đăng nhập: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./vutru1.png')} 
        style={styles.images}
        resizeMode="cover"
      />
      <Image
        source={require('./MAnIXiX-xx.png')} 
        style={styles.image}
      />
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputContainer}>
      {/* <MaterialIcon
        name="email"
        size={20}
        color="gray"
        style={styles.icon2}
       /> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
      {/* <KeyIcon
       name="key-variant"
       size={20}
       color="gray"
       style={styles.icon2}
      /> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={passwordHidden}
        />
        {/* <Icon
          name={passwordHidden ? 'eye-slash' : 'eye'}
          size={20}
          color="gray"
          onPress={() => setPasswordHidden(!passwordHidden)}
          style={styles.icon}
        /> */}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.borderlessButtonContainer}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.borderlessButtonText}>Create a new account?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.borderlessButtonContainer}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
         <Text style={styles.borderlessButtonText}>ForgotPassword?</Text>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    header: {
      fontSize: 24,
      marginBottom: 16,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
    },
    input: {
      flex: 1, 
      height: 40,
      paddingHorizontal: 10,
      backgroundColor:'white'
    },
    icon: {
      right:12, 
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
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
    icon2:{
      left:2,
    },
    image: {
      width: 400,
      height: 250,
    },
    images: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'absolute', 
    },
    borderlessButtonContainer: {
      color:'white',
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'center'
      },
      borderlessButtonText: {
        color: 'blue', 
      },
  });
export default Login;
