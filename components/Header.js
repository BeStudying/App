import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
    return;
}

export default function Header() {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Header"
          component={HomeScreen}
          headerStyle={{
            position: "relative",
          }}
          options={{
            title: 'BeStudy.',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }