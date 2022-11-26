import * as React from 'react';
import { Button, StyleSheet, Text, ScrollView, View, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
    <Drawer.Navigator useLegacyImplementation screenOptions={{
        drawerActiveTintColor: '#1cd404',
        drawerActiveBackgroundColor: '#ddffd9',
        headerShown: false
    }}>
    {friends.map((friend) => {
      return(
        <Drawer.Screen name={friend.title} key={friend.title} component={Amis} initialParams={friend} />
      )
    })}
    </Drawer.Navigator>
  );  
}

function Amis({route}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Emploi du Temps {route?.params?.title}</Text>
    </View>
  );
}