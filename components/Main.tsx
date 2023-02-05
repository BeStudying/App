import {StyleSheet, View} from 'react-native';
import Login from './Login';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay";
import {useEffect, useState} from "react";

export default function Main({navigation, route}: NativeStackScreenProps<any, 'Main'>): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>("Connexion à votre compte PRONOTE...");
    useEffect(() => {
        setLoading(route.params?.loading);
        !!route.params?.loadingText && setLoadingText(route.params?.loadingText);
    });
    return <View style={styles.app}>
        <Spinner
            visible={loading}
            textContent={loadingText}
            textStyle={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                ...styles.shadow
            }}
            indicatorStyle={styles.shadow}
            overlayColor={'rgba(0, 0, 0, 0.40)'}
            animation='fade'
        />
        <View style={{paddingBottom: '50%'}}/>
        <Login navigation={navigation}/>
    </View>;
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
    }
});
