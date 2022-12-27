// noinspection JSUnusedGlobalSymbols

import * as React from 'react';
import {Alert, Image, LogBox, Text, View} from 'react-native';
import type {Lesson} from './Timetable';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Timetable from './Timetable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {useState} from "react";
import {query} from "../api/PronoteAPI.mjs";
import {Card} from 'react-native-paper';

const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={{marginTop: 15}}>
                <Text style={{textAlign: 'center'}}>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</Text>
                <DrawerItem
                    labelStyle={{color: 'green'}}
                    icon={({size}) => <FontAwesome color="green" size={size} name={'user-plus'}/>}
                    label="Ajouter un Ami"
                    onPress={() => Alert.alert('Link to help')}/>
            </View>
        </DrawerContentScrollView>
    );
}

const NoFriends = () => (
    <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Vous n'avez pas d'Amis. 😢</Text>
    </Card>
);

const FriendTimetable = ({route}: DrawerScreenProps<any, string>) => {
    const [timedata, setTimedata] = useState<Lesson[]>([]);
    const [hasFetchTimetable, setHasFetchTimetable] = useState<boolean>(false);

    if (!hasFetchTimetable) query('timetable', route.params?.studentId, route.params?.friendINE).then(data => {
        setTimedata(data);
        setHasFetchTimetable(true);
    });

    return (<Timetable timetable={timedata} friendName={route.params?.friendName}/>);
}
const FriendMarks = ({route}: DrawerScreenProps<any, string>) => {
    return (
        <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
            <Text style={{textAlign: 'center'}}><Text
                style={{fontWeight: 'bold'}}>{route.params?.friendName}</Text> ne
                vous a pas autorisé à voir ses Notes.</Text>
        </Card>
    );
}
const FriendHomeworks = ({route}: DrawerScreenProps<any, string>) => (
    <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
        <Text style={{textAlign: 'center'}}><Text style={{fontWeight: 'bold'}}>{route.params?.friendName}</Text> ne
            vous
            a pas autorisé à voir ses Devoirs.</Text>
    </Card>
);

const Friend = function ({route}: DrawerScreenProps<any, string>) {
    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']); // TODO: À retirer si tu sais d'où sa vient
    return (
        <TopTab.Navigator initialRouteName="Timetable" screenOptions={{
            animationEnabled: false,
            tabBarIndicatorStyle: {
                backgroundColor: 'green'
            }
        }}>
            <TopTab.Screen name="Marks" options={{tabBarLabel: 'Notes'}} component={FriendMarks}
                           initialParams={route.params}/>
            <TopTab.Screen name="Timetable" options={{tabBarLabel: 'EDT'}} component={FriendTimetable}
                           initialParams={route.params}/>
            <TopTab.Screen name="Homeworks" options={{tabBarLabel: 'Devoirs'}} component={FriendHomeworks}
                           initialParams={route.params}/>
        </TopTab.Navigator>
    );
}

export default function Friends({route}: DrawerScreenProps<any, "Amis">) {
    const id: number = route.params?.id;
    const renderFriends = () => {
        if (route.params?.friends?.length ?? 0 > 0) {
            return route.params?.friends?.map((friendINE: string) => {
                const [profilePicture, setProfilePicture] = useState<string>("https://i.imgur.com/tbvsqWK.png");
                const [nom, setNom] = useState<string>("John Doe");

                const [hasFetchProfilePicture, setHasFetchProfilePicture] = useState<boolean>(false);
                const [hasFetchNom, setHasFetchNom] = useState<boolean>(false);

                if (!hasFetchProfilePicture) query("photo", id, friendINE).then(url => {
                    setProfilePicture(url);
                    setHasFetchProfilePicture(true);
                });

                if (!hasFetchNom) query("nom", id, friendINE).then(nom => {
                    setNom(nom);
                    setHasFetchNom(true);
                });

                return (
                    <Drawer.Screen name={nom} key={friendINE} component={Friend}
                                   initialParams={{friendINE: friendINE, friendName: nom, studentId: id}} options={{
                        drawerIcon: ({size}) =>
                            <Image source={{uri: profilePicture}} style={{
                                width: size,
                                height: size,
                                borderRadius: 50
                            }}/>
                    }}/>);
            })
        }
        return (
            <Drawer.Screen component={NoFriends} name={"Sans Amis.."}/>
        );
    }
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props}/>}
            screenOptions={{
                drawerActiveTintColor: '#109e00',
                drawerActiveBackgroundColor: '#ddffd9',
                headerShown: false,
                drawerType: 'front'
            }}
        >
            {renderFriends()}
        </Drawer.Navigator>
    );
}