import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './Login';
import {DrawerScreenProps} from "@react-navigation/drawer";

function Show(props: { login: boolean; navigation: object }) {
    return (
        <View style={styles.app}>
            <View style={{paddingBottom: '50%'}}/>
            <Login navigation={props.navigation}/>
        </View>
    );
}

export default function Main({navigation}: DrawerScreenProps<any, "Main">) {
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
