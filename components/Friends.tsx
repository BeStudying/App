// noinspection JSUnusedGlobalSymbols

import * as React from 'react';
import {Alert, LogBox, Text, View} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    DrawerScreenProps
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Timetable from './Timetable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

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

const timedata = [
    {
        id: 'd728838d727cc7f6',
        from: 1669623900000,
        to: 1669627500000,
        isDetention: false,
        remoteLesson: false,
        status: 'Prof. absent',
        hasDuplicate: false,
        isAway: true,
        isCancelled: false,
        color: '#CE6DA6',
        subject: 'ENS. MORAL & CIVIQUE',
        teacher: 'DARTEVELLE R.',
        room: 'D305'
    },
    {
        id: 'ef6212f5eaf558a2',
        from: 1669628100000,
        to: 1669631700000,
        isDetention: false,
        remoteLesson: false,
        status: 'Prof. absent',
        hasDuplicate: false,
        isAway: true,
        isCancelled: false,
        color: '#11EE5F',
        subject: 'HISTOIRE-GEOGRAPHIE',
        teacher: 'DARTEVELLE R.',
        room: 'D305'
    },
    {
        id: 'c978dff5a9763bdd',
        from: 1669635600000,
        to: 1669639200000,
        isDetention: false,
        remoteLesson: false,
        status: 'Prof. absent',
        hasDuplicate: false,
        isAway: true,
        isCancelled: false,
        color: '#3454A0',
        subject: 'ESPAGNOL LV2',
        teacher: 'DELACOU A.',
        room: 'B003'
    },
    {
        id: '94e4730212e5edc0',
        from: 1669638900000,
        to: 1669642500000,
        isDetention: false,
        remoteLesson: false,
        status: undefined,
        hasDuplicate: false,
        isAway: false,
        isCancelled: false,
        color: '#C93E69',
        subject: 'PHILOSOPHIE',
        teacher: 'FLORES S.',
        room: 'D408'
    },
    {
        id: '4ffb235c4b6b56c2',
        from: 1669642200000,
        to: 1669645800000,
        isDetention: false,
        remoteLesson: false,
        status: 'Prof. absent',
        hasDuplicate: true,
        isAway: true,
        isCancelled: false,
        color: '#11EE5F',
        subject: 'HISTOIRE-GEOGRAPHIE',
        teacher: 'DARTEVELLE R.',
        room: 'D305'
    },
    {
        id: '6dfe08918dbc417',
        from: 1669642200000,
        to: 1669645800000,
        isDetention: false,
        remoteLesson: false,
        status: 'Cours déplacé',
        hasDuplicate: true,
        isAway: false,
        isCancelled: false,
        color: '#803EC1',
        subject: 'MATHS COMPLEMENTAIRE',
        teacher: 'ATIK B.',
        room: 'B311'
    },
    {
        id: 'b60b1d8a20c5ac77',
        from: 1669646100000,
        to: 1669649700000,
        isDetention: false,
        remoteLesson: false,
        status: 'Cours annulé',
        hasDuplicate: false,
        isAway: false,
        isCancelled: true,
        color: '#803EC1',
        subject: 'MATHS COMPLEMENTAIRE',
        teacher: 'ATIK B.',
        room: 'B311'
    }
]

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

const FriendTimetable = ({route}: { route: any }) => (
    <Timetable timetable={timedata} friendId={route.params?.friend?.id} studentId={route.params?.studentId}/>);
const FriendMarks = ({route}: { route: any }) => {
    return (
        <Text style={{textAlign: 'center', fontWeight: 'bold', paddingVertical: 250}}>{route.params?.friend?.title} ne
            vous a pas autorisé à voir ses Notes.</Text>)
}
const FriendHomeworks = ({route}: { route: any }) => (
    <Text style={{textAlign: 'center', fontWeight: 'bold', paddingVertical: 250}}>{route.params?.friend?.title} ne vous
        a pas autorisé à voir ses Devoirs.</Text>);

const Friend = function ({route}: DrawerScreenProps<any, string>) {
    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']); // À retirer si tu sais d'où sa vient
    return (
        <TopTab.Navigator initialRouteName="Timetable" screenOptions={{
            animationEnabled: false,
            tabBarIndicatorStyle: {
                backgroundColor: 'green'
            }
        }}>
            <TopTab.Screen name="Marks" options={{tabBarLabel: 'Notes'}} component={FriendMarks}
                           initialParams={{friend: route.params?.friend}}/>
            <TopTab.Screen name="Timetable" options={{tabBarLabel: 'EDT'}} component={FriendTimetable}
                           initialParams={{friend: route.params?.friend}}/>
            <TopTab.Screen name="Homeworks" options={{tabBarLabel: 'Devoirs'}} component={FriendHomeworks}
                           initialParams={{friend: route.params?.friend}}/>
        </TopTab.Navigator>
    );
}

export default function Friends({route}: DrawerScreenProps<any, "Amis">) {
    const id: number = route.params?.id;
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props}/>}
            screenOptions={{
                drawerActiveTintColor: '#109e00',
                drawerActiveBackgroundColor: '#ddffd9',
                drawerIcon: ({focused, color, size}) => <FontAwesome color={color} size={size}
                                                                     name={focused ? 'toggle-on' : 'toggle-off'}/>,
                headerShown: false,
                drawerType: 'front'

            }}
        >
            {friends.map((friend) => {
                return (
                    <Drawer.Screen name={friend.title} key={friend.title} component={Friend}
                                   initialParams={{friend: friend, studentId: id}}/>
                )
            })}
        </Drawer.Navigator>
    );
}