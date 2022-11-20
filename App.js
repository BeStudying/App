import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Login from './components/Login';

export default function App() {
  return (
    <View style={styles.app}>
      <Header/>
      <View style={{paddingBottom: '62.85%'}}/>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
