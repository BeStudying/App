import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants'
import Main from './Main';

export default function Login() {
    return (
        <Card style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.paragraph}>Veuillez vous authentifier grâce à<br></br>
                <Text style={{fontWeight: 'bold', color: 'green'}}>PRONOTE</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'Utilisateur"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de Passe"
            />
            <Button title='Se Connecter' color='green' style={styles.title} onPress={tryLogin}/>
        </Card>
    );
}

function tryLogin(){
    return (
        <Main/>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 24,
        textAlign: 'center',
    },
    paragraph: {
        margin: 5,
        textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});
