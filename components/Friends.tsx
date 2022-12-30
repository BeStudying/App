// noinspection JSUnusedGlobalSymbols

import {useEffect, useState} from 'react';
import {Alert, Image, LogBox, Text, View} from 'react-native';
import type {Lesson} from './Timetable';
import Timetable from './Timetable';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {query} from "../api/PronoteAPI.mjs";
import {Card} from 'react-native-paper';

const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

function CustomDrawerContent(props: any): JSX.Element {
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

const NoFriends = ({navigation}: DrawerScreenProps<any, string>): JSX.Element => {
    useEffect(() => navigation.getParent()?.navigate('Amis'));
    return (
        <Card style={{top: 250, padding: 15, marginHorizontal: 13}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Vous n'avez pas encore d'Amis
                😅</Text>
        </Card>
    );
}

const FriendTimetable = ({route}: DrawerScreenProps<any, string>): JSX.Element => {
    const [timedata, setTimedata] = useState<Lesson[]>([]);
    const [hasFetchTimetable, setHasFetchTimetable] = useState<boolean>(false);

    if (!hasFetchTimetable) query('timetable', route.params?.studentId, route.params?.friendINE).then(data => {
        setTimedata(data);
        setHasFetchTimetable(true);
    });

    return (<Timetable timetable={timedata} friendName={route.params?.friendName}/>);
}
const FriendMarks = ({route}: DrawerScreenProps<any, string>): JSX.Element => {
    return (
        <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
            <Text style={{textAlign: 'center'}}><Text
                style={{fontWeight: 'bold'}}>{route.params?.friendName}</Text> ne
                vous a pas autorisé à voir ses Notes.</Text>
        </Card>
    );
}
const FriendHomeworks = ({route}: DrawerScreenProps<any, string>): JSX.Element => (
    <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
        <Text style={{textAlign: 'center'}}><Text style={{fontWeight: 'bold'}}>{route.params?.friendName}</Text> ne
            vous
            a pas autorisé à voir ses Devoirs.</Text>
    </Card>
);

const Friend = function ({route}: DrawerScreenProps<any, string>): JSX.Element {
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

export default function Friends({route, navigation}: DrawerScreenProps<any, 'Amis'>): JSX.Element {
    const id: number = route.params?.id;
    const renderFriends = (friends: string[]): JSX.Element[] | JSX.Element => {
        if (friends.length === 0) return (
            <Drawer.Screen key={"NoFriends"} component={NoFriends} name={"Sans Amis.."} options={{
                drawerActiveTintColor: "white",
                drawerActiveBackgroundColor: "white",
            }}/>
        );
        return friends.map((friendINE: string) => {
            const [profilePicture, setProfilePicture] = useState<string>("https://i.imgur.com/tbvsqWK.png");
            const [nom, setNom] = useState<string>("Chargement..");
            const [hasFetchProfile, setHasFetchProfile] = useState<boolean>(false);

            if (!hasFetchProfile) {
                query("nom", id, friendINE).then(nom => {
                    setNom(nom);
                    setHasFetchProfile(true);
                });

                query("photo", id, friendINE).then(url => {
                    setProfilePicture(url);
                    setHasFetchProfile(true);
                });
            }

            return (
                <Drawer.Screen name={nom} key={friendINE} component={Friend}
                               initialParams={{friendINE, friendName: nom, studentId: id}} options={{
                    drawerIcon: ({size}) =>
                        <Image source={{uri: profilePicture}} style={{
                            width: size,
                            height: size,
                            borderRadius: 50
                        }}/>
                }}/>
            );
        });
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
            defaultStatus={route.params?.friends.length ?? 0 > 0 ? 'closed' : 'open'}
        >
            {renderFriends(route.params?.friends)}
        </Drawer.Navigator>
    );
}