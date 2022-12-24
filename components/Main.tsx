import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import Home from './Home';

function Show(props: {login: boolean; navigation: object}){
  return props.login ? (
    <View style={styles.app}>
      <View style={{paddingBottom: '50%'}}/>
      <Login navigation={props.navigation}/>
    </View>
  ) : (
    <Home route={undefined} navigation={props.navigation}/>
  );
}

export default function Main({ navigation }: {navigation: object}) {
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
