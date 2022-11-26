import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login.jsx';
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
