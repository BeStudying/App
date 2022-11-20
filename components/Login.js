import React from 'react';
import { Button, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login(props) {
    return (
        <SafeAreaView>
            <Card style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <Text style={styles.paragraph}>Veuillez vous authentifier grâce à
                    <Text style={{fontWeight: 'bold', color: 'green'}}> PRONOTE</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'Utilisateur"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de Passe"
                />
                <Button title='Se Connecter' color='green' onPress={() => props.navigation.navigate('Home')}/>
            </Card>
        </SafeAreaView>
    );
}

function tryLogin(){
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: '75%',
        borderRadius: '15px',
        width: "94%",
        marginLeft: "3%",
    },
    title: {
        fontSize: 25,
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
