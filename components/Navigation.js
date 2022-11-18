import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Alerts from './Alerts';
import Friends from './Friends';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Amis" screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false
      }}>
        <Tab.Screen name="Amis" component={Friends} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="users" color={color} size={size} />
          )
        }} />
        <Tab.Screen name="Alertes" component={Alerts} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notification-important" color={color} size={size} />
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}