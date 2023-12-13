import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Transection from './Transection';
import Customer from './Customer';
import Setting from './Setting';
import AddService from './AddService';
import EditService from './EditService';
import ServiceDetail from './ServiceDetail';
import Login from './Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AllScreen = () => {
  return (
    <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              activeTintColor: '#0099FF',
              inactiveTintColor: 'gray',
            }}
            
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) =>
                getTabBarIcon(route, focused, color, size),
            })}
            
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Transaction" component={Transection} />
            <Tab.Screen name="Customer" component={Customer} />
            <Tab.Screen name="Setting" component={Setting} />
          </Tab.Navigator>
  );
};

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Transaction') {
    iconName = focused ? 'cash' : 'cash-outline';
  } else if (route.name === 'Customer') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route.name === 'Setting') {
    iconName = focused ? 'settings' : 'settings-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};
const App = () => {
  return (
    <Provider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="HomeTab" component={AllScreen} options={{ headerShown: false, tabBarVisible: false }} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="EditService" component={EditService} />
      <Stack.Screen name='Login' component={Login}/>
    </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
