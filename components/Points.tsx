import {Alert, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";

export default function Points(): JSX.Element {
    const infos = () => Alert.alert("Gagne de l'argent grâce à tes Notes", "Ce système te permettra de convertir tes notes en points, qui te seront transférés en argent.");
    return <View style={styles.container}>
        <FontAwesome5Icon name='lock' color='white' style={[styles.text, styles.shadow, {fontSize: 75, padding: 15}]}
                          size={50}/>
        <Text style={[styles.text, styles.shadow]}>1/1000 Inscriptions</Text>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}
                   onPress={infos}>
            <Text style={[styles.text, {
                backgroundColor: 'rgba(255,255,255,0.20)',
                borderColor: '#00a2ff',
                color: '#00a2ff',
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                marginHorizontal: 100,
                marginVertical: 25
            }]}><FontAwesome5Icon name={'info-circle'} size={20}/> Informations</Text>
        </Pressable>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.10)',
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10,
        opacity: 1,
    },
    shadow: {
        shadowColor: 'rgba(0,0,0)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        opacity: 1,
    },
    button: {
        borderWidth: 2,
        borderColor: 'black',
    }
});