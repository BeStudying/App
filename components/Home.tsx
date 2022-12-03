import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';

export default function Home({ route }: any) {
  return (
    <View style={styles.app}>
      <Navigation route={route}/>
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