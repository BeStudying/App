import React, {useState} from 'react';
import { Button, Text, TextInput, StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, TextInputProps } from 'react-native-paper';
import getSchools from '../api/EducationAPI.mjs';
import { getCAS, login } from '../api/PronoteAPI.mjs';
import { Dropdown } from 'react-native-element-dropdown';

let lastQuery: string|null = null;

export default function Login(props: any) {
    const [defaultEntries, setDefaultEntries] = useState(false);

    const [username, setUsername] = useState('');
    const [isFocusUsername, setIsFocusUsername] = useState(false);

    const [password, setPassword] = useState('');
    const [isFocusPassword, setIsFocusPassword] = useState(false);

    const [ent, setENT] = useState(null);
    const [isFocusENT, setIsFocusENT] = useState(false);
    const [entData, setENTData] = useState([]);

    const [school, setSchool] = useState(null);
    const [isFocusSchool, setIsFocusSchool] = useState(false);
    const [schoolsData, setSchoolsData] = useState([]);
    const [schoolQuery, setSchoolQuery] = useState('');
  
    const renderENT = () => (ent || isFocusENT) 
        ? (<Text style={[styles.label, isFocusENT && { color: 'green' }]}>ENT</Text>) 
        : null;  
        
    const renderSchool = () => (school || isFocusSchool) 
        ? (<Text style={[styles.label, isFocusSchool && { color: 'green' }]}>École</Text>) 
        : null;

    if(!entData.length){
        (async () => {
            setENTData(await getCAS());
        })();
    }
    
    (async (query: string) => {
        if(query === lastQuery) return; // Prevents refresh too fast (laggy + rate limited)
        const data: any = await getSchools(query);
        setSchoolsData(data);
        lastQuery = query
    })(schoolQuery);
    
    if(!defaultEntries){
        (async () => {
            const username: any = await AsyncStorage.getItem('username') ?? '';
            const password: any = await AsyncStorage.getItem('password') ?? '';
            const ent: any = await AsyncStorage.getItem('ent') ?? null;
            const school: any = await AsyncStorage.getItem('school') ?? null;

            setUsername(username);
            setPassword(password);
            setENT(ent);
            setSchool(school);
            setDefaultEntries(true);
        })();
    };

    return (
        <SafeAreaView>
            <Card style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <Text style={styles.paragraph}>Veuillez vous authentifier à
                    <Text style={{fontWeight: 'bold', color: 'green'}}> PRONOTE</Text> grâce à l'<Text style={{fontWeight: 'bold', color: '#00a2ff'}}>ENT</Text>
                </Text>
                <TextInput
                    style={[styles.input,
                        !username && { borderColor: 'black' },
                        (isFocusUsername && !(isFocusENT || isFocusSchool)) && { borderColor: 'blue' }]}
                    onFocus={() => setIsFocusUsername(true)}
                    onBlur={() => setIsFocusUsername(false)}
                    placeholder="Nom d'Utilisateur"
                    placeholderTextColor="black"
                    value={username}
                    onChangeText={(newValue) => setUsername(newValue)}
                />
                <TextInput
                    style={[styles.input,
                        !password && { borderColor: 'black' },
                        (isFocusPassword && !(isFocusENT || isFocusSchool)) && { borderColor: 'blue' }]}
                    onFocus={() => setIsFocusPassword(true)}
                    onBlur={() => setIsFocusPassword(false)}
                    placeholder="Mot de Passe"
                    placeholderTextColor="black" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(newValue) => setPassword(newValue)}
                    cursorColor={'green'}
                />
                <View style={{padding: 10}}>
                {renderENT()}
                <Dropdown
                    statusBarIsTranslucent={true}
                    style={[styles.dropdown, 
                        !ent && { borderColor: 'black' },
                        isFocusENT && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={entData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusENT ? 'Sélectionner votre ENT' : '...'}
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
                <View style={{padding: 10}}>
                {renderSchool()}
                <Dropdown
                    statusBarIsTranslucent={true}
                    style={[styles.dropdown, 
                        !school && { borderColor: 'black' },
                        isFocusSchool && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={schoolsData}
                    search
                    searchQuery={(keyword, labelValue) => {
                        setSchoolQuery(keyword)
                        return true;
                    }}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={school ? school : (!isFocusSchool ? 'Rechercher votre établissement publique' : '...')}
                    searchPlaceholder="Rechercher"
                    value={school}
                    onFocus={() => setIsFocusSchool(true)}
                    onBlur={() => setIsFocusSchool(false)}
                    onChange={(item) => {
                        setSchool(item.value);
                        setIsFocusSchool(false);
                    }}
                />
                </View>
                <Button title='Se Connecter' color='green' onPress={() => tryLogin(props.navigation, username, password, ent, school)}/>
            </Card>
        </SafeAreaView>
    );
}

async function tryLogin(navigation: any, username: string, password: string, ent: string|null, school: string|null){
    if(!username){
        Alert.alert("Veuillez entrer un nom d'utilisateur !");
        return;
    }
    else if(!password){
        Alert.alert("Veuillez entrer un mot de passe !");
        return;
    }
    else if (!ent){
        Alert.alert("Veuillez sélectionner un ENT !");
        return;
    }
    else if (!school){
        Alert.alert("Veuillez sélectionner un établissement !");
        return;
    }
    const id = await login(username, password, ent, school);
    if(id){
        navigation.navigate('Home', {
            id: id
        })
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('ent', ent);
        AsyncStorage.setItem('school', school);
    } else {
        Alert.alert("Compte invalide.");
        return;
    }
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
