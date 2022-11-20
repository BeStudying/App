import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header.js';
import Navigation, {Tab} from './Navigation.js';
import Login from './Login.js';
import { createNavigationContainerRef } from '@react-navigation/native';

const navigation = createNavigationContainerRef()

function Show(props){
  return props.login ? (
    <View style={styles.app}>
      <View style={{paddingBottom: '50%'}}/>
      <Login navigation={props.navigation}/>
    </View>
  ) : (
    <Home/>
  );
}

export default function Main({ navigation }) {
  return (
      <Show login={true} navigation={navigation}/>
  );
}


const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
