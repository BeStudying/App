import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './Navigation';

export default function Home({ route, navigation }: {route: any, navigation: any}) {
  return (
    <View style={styles.app}>
      <Navigation route={route} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
    app: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1'
    },
  });