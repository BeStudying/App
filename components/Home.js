import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';

export default function Home({navigation}) {
  return (
    <View style={styles.app}>
      <Navigation/>
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