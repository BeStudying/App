import * as React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Navigation from './Navigation';
import {DrawerScreenProps} from "@react-navigation/drawer";
import {ping} from "../api/PronoteAPI.mjs";
import {useState} from "react";

export default function Home({route, navigation}: DrawerScreenProps<any, "Home">) {
    const [nextPing, setNextPing] = useState<number>(Date.now());
    if (nextPing - Date.now() <= 0) ping(route.params?.id).then(result => {
        if(!result){
            Alert.alert("Connexion perdue", "La connexion au serveur a été perdue.")
        }
        setNextPing(Date.now() + 10000);
    });

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