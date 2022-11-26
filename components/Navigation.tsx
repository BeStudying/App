import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Alerts from './Alerts';
import Friends from './Friends';
import Options from './Options';
import { View } from 'react-native';

export const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName="Accueil" screenOptions={{
      tabBarActiveTintColor: 'green',
      headerShown: false
    }}>
      <Tab.Screen name="Amis" component={Friends} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="users" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Accueil" component={Options} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Alertes" component={Alerts} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notification-important" color={color} size={size} />
        )
      }}/>
    </Tab.Navigator>
  );
}