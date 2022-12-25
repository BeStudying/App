import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Friends from './Friends';
import Self from './Self';
import {DrawerActions} from '@react-navigation/native';
import {DrawerScreenProps} from "@react-navigation/drawer";
import {query} from "../api/PronoteAPI.mjs";

const Tab = createBottomTabNavigator();

let id: number | undefined = undefined;

export default function Navigation({route, navigation}: DrawerScreenProps<any, string>) {
    id ??= route.params?.id;
    navigation.setOptions({
        headerLeft: () => (
            <FontAwesome.Button name="address-book" backgroundColor={'green'} onPress={() => {
                navigation.navigate('Amis');
                navigation.dispatch(DrawerActions.openDrawer()); // useDrawerStatus() === 'open' ? DrawerActions.closeDrawer() : DrawerActions.openDrawer()
            }} color='#f6f6f6' size={20}/>
        ),
        headerRight: () => (
            <FontAwesome.Button name="gear" backgroundColor={'green'} onPress={() => Alert.alert("Paramètres ici")}
                                color='#f6f6f6' size={20}/>
        ),
    });
    const [friends, setFriends] = useState<string[]>([]);
    if(friends.length === 0){
        query("friends", id ?? 0, "").then(data => {
            setFriends(data)
        });
    }
    return (
        <Tab.Navigator initialRouteName="Amis" screenOptions={{
            tabBarActiveTintColor: 'green',
            headerShown: false
        }}>
            <Tab.Screen name="Amis" component={Friends} initialParams={{id, friends}} options={{
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name="users" color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name="Moi" component={Self} initialParams={{id}} options={{
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name="user" color={color} size={size}/>
                )
            }}/>
        </Tab.Navigator>
    );
}