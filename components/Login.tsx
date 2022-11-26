import React, {useState} from 'react';
import { Button, Text, TextInput, StyleSheet, SafeAreaView, View} from 'react-native';
import { Card } from 'react-native-paper';
import getSchools from '../api/EducationAPI';
import { Dropdown } from 'react-native-element-dropdown';

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ent, setENT] = useState(null);
    const [isFocus, setIsFocusENT] = useState(false);
  
    const renderENT = () => (ent || isFocus) 
        ? (<Text style={[styles.label, isFocus && { color: 'green' }]}>ENT</Text>) 
        : null
    const schools = async () => await getSchools('Lycée Jean Pierre Timbaud')
    return (
        <SafeAreaView>
            <Card style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <Text style={styles.paragraph}>Veuillez vous authentifier à
                    <Text style={{fontWeight: 'bold', color: 'green'}}> PRONOTE</Text> grâce à l'<Text style={{fontWeight: 'bold', color: '#00a2ff'}}>ENT</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'Utilisateur"
                    placeholderTextColor="black" 
                    value={username}
                    onChangeText={(newValue) => setUsername(newValue)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de Passe"
                    placeholderTextColor="black" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(newValue) => setPassword(newValue)}
                    cursorColor={'green'}
                />
                <View style={{
                    backgroundColor: 'white',
                    padding: 10,
                }}>
                {renderENT()}
                <Dropdown
                    statusBarIsTranslucent={true}
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={[{label: 'ent.iledefrance.fr', value:'ent.iledefrance.fr'}]}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Sélectionner votre ENT' : '...'}
                    searchPlaceholder="Rechercher"
                    value={ent}
                    onFocus={() => setIsFocusENT(true)}
                    onBlur={() => setIsFocusENT(false)}
                    onChange={(item) => {
                        setENT(item.value);
                        setIsFocusENT(false);
                    }}
                />
                </View>
                <Button title='Se Connecter' color='green' onPress={() => tryLogin(props.navigation, username, password, ent)}/>
            </Card>
        </SafeAreaView>
    );
}

function tryLogin(navigation, username, password, ent){
    navigation.navigate('Home')
    navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
    });
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: '75%',
        borderRadius: 15,
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
      padding: 10,
      borderRadius: 8,
      borderColor: 'green',
      borderWidth: 0.5,
      color: 'green',
    },
    dropdown: {
        height: 50,
        borderColor: 'green',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});