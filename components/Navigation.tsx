import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Friends from './Friends';
import Self from './Self';
import {DrawerActions} from '@react-navigation/native';
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ping, query} from "../api/PronoteAPI.mjs";

const Tab = createBottomTabNavigator();

let id: number | undefined = undefined;

export default function Navigation({route, navigation}: DrawerScreenProps<any, string>): JSX.Element {
    id ??= route.params?.id;
    navigation.setOptions({
        headerLeft: (): JSX.Element => (
            <FontAwesome.Button name="address-book" backgroundColor={'green'} onPress={() => {
                navigation.navigate('Amis');
                navigation.dispatch(DrawerActions.openDrawer()); // useDrawerStatus() === 'open' ? DrawerActions.closeDrawer() : DrawerActions.openDrawer()
            }} color='#f6f6f6' size={20}/>
        ),
        headerRight: (): JSX.Element => (
            <FontAwesome.Button name="gear" backgroundColor={'green'} onPress={() => Alert.alert("Paramètres ici")}
                                color='#f6f6f6' size={20}/>
        ),
    });
    const [nextPing, setNextPing] = useState<number>(Date.now());
    const returnToLogin = (): void => {
        Alert.alert("Connexion perdue", "Vous avez été déconnecté du serveur, veuillez vous reconnecter.", [{
            text: "Se reconnecter",
            onPress: (): void => {
                navigation.navigate('Main');
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Main'}],
                });
            },
        }]);
    };
    if (!id) returnToLogin();
    if (id && (nextPing - Date.now() <= 0)) {
        ping(id).then((result: boolean): void => {
            if (!result) {
                returnToLogin();
                setNextPing(Infinity);
            } else setNextPing(Date.now() + 10000);
        });
    }
    const [friends, setFriends] = useState<string[]>([]);
    if (id && friends.length === 0) {
        query("friends", id, "").then((data: string[]): void => setFriends(data));
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