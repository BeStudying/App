// noinspection JSUnusedGlobalSymbols

import type {Lesson} from './Timetable';
import Timetable from './Timetable';
import type {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,} from '@react-navigation/drawer';
import type {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import * as React from 'react';
import {useState} from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    LogBox,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {query} from "../api/PronoteAPI.mjs";
import {Card} from 'react-native-paper';
import DrawerToggleButton from "@react-navigation/drawer/src/views/DrawerToggleButton";

const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const CustomDrawerContent = (props: any): JSX.Element => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={{marginTop: 15}}>
                <Text style={{textAlign: 'center'}}>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</Text>
                <DrawerItem
                    labelStyle={{color: 'green'}}
                    icon={({size}) => <FontAwesome color="green" size={size} name='user-plus'/>}
                    label="Ajouter un Ami"
                    onPress={() => props.navigation.navigate('AddFriend')}/>
            </View>
        </DrawerContentScrollView>
    );
}

export function AddFriend(): JSX.Element {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const styles = StyleSheet.create({
        title: {
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
            padding: 10,
            color: 'green',
            marginBottom: 25,
            backgroundColor: 'rgba(232,253,218)',
        },
        input: {
            fontSize: 15,
            padding: 10,
            borderWidth: 1,
            marginHorizontal: 10,
            borderRadius: 10,
            borderColor: 'green',
        },
        focus: {
            marginBottom: 400,
            backgroundColor: 'white',
            color: 'black',
            height: 50,
        },
        button: {
            padding: 10,
            borderWidth: 2,
            marginHorizontal: 100,
            marginVertical: 50,
            backgroundColor: 'green',
            borderRadius: 25,
            borderColor: '#23ac3f',
        },
        buttonText: {
            fontSize: 15,
            textAlign: 'center',
            color: 'white',
        },
    })
    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[{flex: 1, justifyContent: "space-around"}]}>
                <Text style={styles.title}>Ajouter un Ami</Text>
                <TextInput style={[styles.input, isFocus && styles.focus]} onFocus={() => setIsFocus(true)}
                           onBlur={() => setIsFocus(false)}
                           placeholderTextColor={'gray'}
                           placeholder={'Entrer le nom et prénom de la personne à ajouter'}

                />
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}><FontAwesome name={'search'} size={15}
                                                                 style={{position: 'absolute'}}/><View
                        style={{paddingHorizontal: 5}}/>
                        Rechercher</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>;
}

const NoFriends = ({navigation}: DrawerScreenProps<any, string>): JSX.Element => <Card
    style={{top: 250, padding: 15, marginHorizontal: 13}}>
    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Vous n'avez pas encore d'Amis
        😅</Text>
</Card>;

const FriendTimetable = ({route}: MaterialTopTabScreenProps<any, string>): JSX.Element => {
    const [timedata, setTimedata] = useState<Lesson[]>([]);
    const [hasFetchTimetable, setHasFetchTimetable] = useState<boolean>(false);

    if (!hasFetchTimetable) query('timetable', route.params?.studentId, route.params?.friendINE).then(data => {
        setTimedata(data);
        setHasFetchTimetable(true);
    });

    return <Timetable timetable={timedata} name={route.params?.friendName}/>;
}
const FriendMarks = ({route}: MaterialTopTabScreenProps<any, string>): JSX.Element => {
    return <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
        <Text style={{textAlign: 'center'}}><Text
            style={{fontWeight: 'bold'}}>{route.params?.friendName}</Text> ne
            vous a pas autorisé à voir ses Notes.</Text>
    </Card>;
}
const FriendHomeworks = ({route}: MaterialTopTabScreenProps<any, string>): JSX.Element => <Card
    style={{top: 250, padding: 5, marginHorizontal: 10}}>
    <Text style={{textAlign: 'center'}}><Text style={{fontWeight: 'bold'}}>{route.params?.friendName}</Text> ne
        vous
        a pas autorisé à voir ses Devoirs.</Text>
</Card>;

const Friend = function ({route}: DrawerScreenProps<any>): JSX.Element {
    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']); // TODO: À retirer si tu sais d'où sa vient
    return <TopTab.Navigator initialRouteName="Timetable" screenOptions={{
        animationEnabled: false,
        tabBarIndicatorStyle: {
            backgroundColor: 'green'
        }
    }}>
        <TopTab.Screen name="Timetable" options={{
            tabBarLabelStyle: {
                right: -155
            }, tabBarLabel: new Date().toLocaleDateString().split('/').slice(0, -1).join('/')
        }}
                       component={FriendTimetable}
                       initialParams={route.params}/>
    </TopTab.Navigator>;
}

export default function Friends({route}: BottomTabScreenProps<any, 'Amis'>): JSX.Element {
    const id: number = route.params?.id;
    const renderFriends = (friends: string[]): JSX.Element[] | JSX.Element => {
        if (friends.length === 0) return <Drawer.Screen key={"NoFriends"} component={NoFriends} name={"Sans Amis.."}
                                                        options={{
                                                            drawerActiveTintColor: "white",
                                                            drawerActiveBackgroundColor: "white",
                                                        }}/>;
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

            return <Drawer.Screen name={nom} key={friendINE} component={Friend}
                                  initialParams={{friendINE, friendName: nom, studentId: id}} options={{
                drawerIcon: ({size}) =>
                    <Image source={{uri: profilePicture}} style={{
                        width: size,
                        height: size,
                        borderRadius: 50
                    }}/>
            }}/>;
        });
    }

    return <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
        screenOptions={{
            drawerActiveTintColor: '#109e00',
            drawerActiveBackgroundColor: '#ddffd9',
            headerShown: true,
            headerLeft: () => <DrawerToggleButton pressOpacity={0.5} tintColor='green'/>,
            headerTransparent: true,
            drawerType: 'front',
            lazy: false,
            swipeEdgeWidth: 1000,
            swipeMinDistance: 0,
        }}
        defaultStatus={route.params?.friends.length ?? 0 > 0 ? 'closed' : 'open'}
    >
        {renderFriends(route.params?.friends)}
    </Drawer.Navigator>;
}