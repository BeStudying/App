import {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Friends from './Friends';
import Tools from './Tools';
import {ping} from "../api/PronoteAPI.mjs";
import {DrawerActions} from "@react-navigation/native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Points from './Points';
import Sponsor from './Sponsor';

const Tab = createBottomTabNavigator();

let id: number | undefined = undefined;

export default function Navigation({route, navigation, friends}: NativeStackScreenProps<any> & { friends: string[] }):
    JSX.Element | null {
    if(id === undefined){
        id = route.params?.id
    }
    useEffect(() => navigation.setOptions({
        headerLeft: (): JSX.Element => <FontAwesome.Button name='address-book' backgroundColor={'green'}
                                                           onPress={() => {
                                                               navigation.navigate('Amis');
                                                               navigation.dispatch(DrawerActions.openDrawer());
                                                           }} color='#f6f6f6' size={20}/>,
        headerRight: (): JSX.Element => <FontAwesome.Button name='gear' backgroundColor={'green'}
                                                            onPress={() => navigation.navigate('Settings')}
                                                            color='#f6f6f6' size={20}/>,
    }));
    const [nextPing, setNextPing] = useState<number>(Date.now());
    const returnToLogin = (): null => {
        navigation.navigate('Main');
        navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
        });
        Alert.alert("Connexion perdue", "Vous avez été déconnecté du serveur, veuillez vous reconnecter.");
        return null;
    };
    if (!id) return returnToLogin();
    if (nextPing - Date.now() <= 0) {
        ping(id).then((result: boolean): void => {
            if (result) return setNextPing(Date.now() + 60000);
            returnToLogin();
            setNextPing(Infinity);
        });
    }

    return <Tab.Navigator initialRouteName='Points' screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false
    }}>
        <Tab.Screen name='Amis' component={Friends} initialParams={{id, friends}} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='users' color={color} size={size}/>
        }}/>
        <Tab.Screen name='Points' component={Points} initialParams={{id}} options={{
            tabBarIcon: ({color, size}) => <AntDesign name={'star'} color={color} size={20}/>
        }}/>
        <Tab.Screen name='Parrainage' component={Sponsor} initialParams={{id}} options={{
            tabBarIcon: ({color, size}) => <Fontisto name={'share'} color={color} size={20}/>
        }}/>
    </Tab.Navigator>;
}