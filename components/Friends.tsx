import * as React from 'react';
import { Text, View, } from 'react-native';
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

const Ami = function({route}: any){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Emploi du Temps {route?.params?.title}</Text>
    </View>
  );
}

export default function Friends() {
  return (
    <Drawer.Navigator useLegacyImplementation screenOptions={{
        drawerActiveTintColor: '#109e00',
        drawerActiveBackgroundColor: '#ddffd9',
        headerShown: false
    }}>
    {friends.map((friend) => {
      return(
        <Drawer.Screen name={friend.title} key={friend.title} component={Ami} initialParams={friend} />
      )
    })}
    </Drawer.Navigator>
  );  
}