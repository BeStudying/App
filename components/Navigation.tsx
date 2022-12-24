import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PronoBac from './PronoBac';
import Friends from './Friends';
import Self from './Self';
import { DrawerActions } from '@react-navigation/native';
export const Tab = createBottomTabNavigator();

let id: number|undefined = undefined;

export default function Navigation({route, navigation}: {route: any, navigation: any}) {
  id ??= route.params?.id;
  navigation.setOptions({
    headerLeft: () => (
      <FontAwesome.Button name="users" backgroundColor={'green'} onPress={() => {
        navigation.navigate('Amis')
        navigation.dispatch(DrawerActions.openDrawer())
      }} color='white' size={20}/>
    ),
    headerRight: () => (
      <FontAwesome.Button name="gear" backgroundColor={'green'} onPress={() => Alert.alert("test")} color='white' size={20}/>
    ),
  });
  return (
    <Tab.Navigator initialRouteName="Accueil" screenOptions={{
      tabBarActiveTintColor: 'green',
      headerShown: false
    }}>
      <Tab.Screen name="Amis" component={Friends} initialParams={{id: id}} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="users" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Moi" component={Self} initialParams={{id: id}} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Prono'Bac" component={PronoBac} initialParams={{id: id}} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="area-chart" color={color} size={size} />
        )
      }}/>
    </Tab.Navigator>
  );
}