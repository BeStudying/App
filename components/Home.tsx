import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Navigation from './Navigation';
import {DrawerScreenProps} from "@react-navigation/drawer";

export default function Home({route, navigation}: DrawerScreenProps<any, "Home">) {
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