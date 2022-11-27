import * as React from 'react';
import { Text, View, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Timetable from './Timetable';
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

const Ami = function({route}: {route: any }){
  const timedata = [{
    id: '29a22ab6024ee07c',
    from: 1669564676,
    to: 1669564676,
    isDetention: false,
    remoteLesson: false,
    status: undefined,
    hasDuplicate: false,
    isAway: false,
    isCancelled: false,
    color: '#C93E69',
    subject: 'PHILOSOPHIE',
    teacher: 'JOHN DOE',
    room: 'D408',
  },
  {
    id: 'd1297e2340e6466b',
    from: 1669564676,
    to: 1669564676,
    isDetention: false,
    remoteLesson: false,
    status: 'Prof. absent',
    hasDuplicate: false,
    isAway: true,
    isCancelled: false,
    color: '#11EE5F',
    subject: 'HISTOIRE-GEOGRAPHIE',
    teacher: 'BIG JOHN',
    room: 'D305'
  },
  {
    id: '9ef643a51f4b34ba',
    from: 1669564676,
    to: 1669564676,
    isDetention: false,
    remoteLesson: false,
    status: 'Prof. absent',
    hasDuplicate: false,
    isAway: true,
    isCancelled: false,
    color: '#3454A0',
    subject: 'ESPAGNOL LV2',
    teacher: 'JOHN WICK',
    room: 'B003'
  }]
  return (
    <View style={{ flex: 1}}>
    <Text style={{ fontSize: 25, textAlign: 'center', color:'#109e00'}}>Emploi du temps de {route?.params?.title}</Text>
      <Timetable timetable={timedata}/>
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