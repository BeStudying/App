import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Navigation from './Navigation';

export default function Main() {
  return (
    <View>
        <Header/>
        <Navigation/>
    </View>
  );
}
