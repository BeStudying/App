import React from 'react';
import { Button, StyleSheet, Text, ScrollView, View, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
const Drawer = createDrawerNavigator();

const friends = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Amis 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Amis 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Amis 3',
  },
];

export default function Friends() {
  return (
    <ScrollView>
      {friends.map((friend) => {
        return(
          <Card style={{margin: 15, padding: 25, borderRadius: '10px'}}>
            <Text>{friend.title}</Text>
          </Card>
        )
      })}
    </ScrollView>
  );  
}

/*
<Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Amis 1" component={Home}/>
    <Drawer.Screen name="Amis 2" component={Home}/>
    <Drawer.Screen name="Amis 3" component={Home}/>
    <Drawer.Screen name="Amis 4" component={Home}/>
    <Drawer.Screen name="Amis 5" component={Home}/>
  </Drawer.Navigator>
*/