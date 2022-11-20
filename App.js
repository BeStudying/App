import React from 'react';
import Main from './components/Main';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={'Main'}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ 
            title: 'BeStudy.', 
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },  
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ 
            title: 'BeStudy.', 
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },  
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}