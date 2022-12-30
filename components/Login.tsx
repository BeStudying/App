// noinspection JSIgnoredPromiseFromCall

import {useState} from 'react';
import {ActivityIndicator, Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import getSchools from '../api/EducationAPI.mjs';
import {getCAS, login, query} from '../api/PronoteAPI.mjs';
import {Dropdown} from 'react-native-element-dropdown';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import CInput from "react-native-element-dropdown/src/components/TextInput";

export default function Login(props: any): JSX.Element {
    const [defaultEntries, setDefaultEntries] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);

    const [ent, setENT] = useState<string | undefined>(undefined);
    const [isFocusENT, setIsFocusENT] = useState<boolean>(false);
    const [entData, setENTData] = useState<{ label: string, value: string }[]>([]);

    const [schoolRNE, setSchoolRNE] = useState<string | undefined>(undefined);
    const [schoolName, setSchoolName] = useState<string | undefined>(undefined);
    const [isFocusSchool, setIsFocusSchool] = useState<boolean>(false);
    const [schoolsData, setSchoolsData] = useState<{ label: string, value: string }[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const renderENT = (): JSX.Element | null => (ent || isFocusENT)
        ? (<Text style={[styles.label, isFocusENT && {color: 'green'}]}>ENT</Text>)
        : null;

    const renderSchool = (): JSX.Element | null => (schoolRNE || isFocusSchool)
        ? (<Text style={[styles.label, isFocusSchool && {color: 'green'}]}>Établissement</Text>)
        : null;

    const renderConnect = (): JSX.Element =>
        isLoading
            ? <ActivityIndicator size="large" color="green"/>
            : (
                <Pressable style={styles.button} onPress={() => {
                    setIsLoading(true);
                    tryLogin(props.navigation, setIsLoading, {username, password, ent, schoolRNE, schoolName});
                    setTimeout(() => setIsLoading(false), 10000);
                }}>
                    <Text style={styles.buttonText}>Se Connecter</Text>
                </Pressable>);

    if (entData.length === 0) (async (): Promise<void> => setENTData(await getCAS()))();

    if (!defaultEntries) (async (): Promise<void> => {
        const username: string = await AsyncStorage.getItem('username') ?? '';
        const password: string = await AsyncStorage.getItem('password') ?? '';
        const ent: string | undefined = await AsyncStorage.getItem('ent') ?? undefined;
        const schoolRNE: string | undefined = await AsyncStorage.getItem('schoolRNE') ?? undefined;
        const schoolName: string | undefined = await AsyncStorage.getItem('schoolName') ?? undefined;

        setUsername(username);
        setPassword(password);
        setENT(ent);
        setSchoolRNE(schoolRNE);
        setSchoolName(schoolName);
        setDefaultEntries(true);
    })();

    return (
        <SafeAreaView>
            <Card style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <Text style={styles.paragraph}>Veuillez vous authentifier à
                    <Text style={{fontWeight: 'bold', color: 'green'}}> PRONOTE</Text> grâce à l'<Text
                        style={{fontWeight: 'bold', color: '#00a2ff'}}>ENT</Text>
                </Text>
                <TextInput
                    style={[styles.input,
                        !username && {borderColor: 'black'},
                        (isFocusUsername && !(isFocusENT || isFocusSchool)) && {borderColor: 'blue'}]}
                    onFocus={(): void => setIsFocusUsername(true)}
                    onBlur={(): void => setIsFocusUsername(false)}
                    placeholder="Nom d'Utilisateur"
                    placeholderTextColor="black"
                    value={username}
                    onChangeText={(newValue) => setUsername(newValue)}
                />
                <TextInput
                    style={[styles.input,
                        !password && {borderColor: 'black'},
                        (isFocusPassword && !(isFocusENT || isFocusSchool)) && {borderColor: 'blue'}]}
                    onFocus={(): void => setIsFocusPassword(true)}
                    onBlur={(): void => setIsFocusPassword(false)}
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
                            !ent && {borderColor: 'black'},
                            isFocusENT && {borderColor: 'blue'}]}
                        iconStyle={[styles.iconStyle, isFocusENT && {tintColor: 'green'}]}
                        data={entData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        renderLeftIcon={() => <MaterialCommunityIcons name='web' color={isFocusENT ? 'green' : 'black'}
                                                                      size={20} style={{margin: 7}}/>}
                        value={ent}
                        onFocus={(): void => setIsFocusENT(true)}
                        onBlur={(): void => setIsFocusENT(false)}
                        onChange={(item): void => {
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
                            !schoolRNE && {borderColor: 'black'},
                            isFocusSchool && {borderColor: 'blue'}]}
                        iconStyle={[styles.iconStyle, isFocusSchool && {tintColor: 'green'}]}
                        data={schoolsData}
                        search
                        placeholder={schoolRNE ? schoolName ?? schoolRNE : "..."}
                        dropdownPosition='top'
                        renderInputSearch={() => {
                            return <CInput
                                style={[styles.input, styles.inputSearchStyle]}
                                onChangeText={(search): void => {
                                    if (search.length < 5 || search.length > 6) return setSchoolsData([]);
                                    getSchools(search).then(data => {
                                        setSchoolsData(data);
                                    });
                                }}
                                autoCorrect={false}
                                keyboardType='number-pad'
                                placeholder={"Entrer le code postal de l'établissement"}
                                placeholderTextColor="gray"
                            />
                        }}
                        renderLeftIcon={() => <FontAwesome5Icon name='school'
                                                                color={isFocusSchool ? 'green' : 'black'}
                                                                size={15} style={{margin: 7}}/>}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        confirmSelectItem
                        value={schoolRNE}
                        onFocus={(): void => setIsFocusSchool(true)}
                        onBlur={(): void => {
                            setIsFocusSchool(false);
                        }}
                        onChange={(item): void => {
                            setSchoolName(item.label);
                            setSchoolRNE(item.value);
                            setIsFocusSchool(false);
                        }}
                    />
                </View>
                {renderConnect()}
            </Card>
        </SafeAreaView>
    );
}

async function tryLogin(navigation: NativeStackNavigationProp<any>, loadingCallback: (value: boolean) => void, {
    username,
    password,
    ent,
    schoolRNE,
    schoolName
}: { username: string, password: string, ent?: string, schoolRNE?: string, schoolName?: string }): Promise<void> {
    if (!username) {
        loadingCallback(false);
        Alert.alert("Connexion impossible", "Vous devez entrer un nom d'utilisateur.");
        return;
    } else if (!password) {
        loadingCallback(false);
        Alert.alert("Connexion impossible", "Vous devez entrer un mot de passe.");
        return;
    } else if (!ent) {
        loadingCallback(false);
        Alert.alert("Connexion impossible", "Vous devez sélectionner un ENT.");
        return;
    } else if (!schoolRNE) {
        loadingCallback(false);
        Alert.alert("Connexion impossible", "Vous devez sélectionner un établissement.");
        return;
    }
    const id = await login(username, password, ent, schoolRNE);
    if (id > 0) {
        const friends: string[] = await query('friends', id, null);
        navigation.navigate('Home', {id, friends});
        navigation.reset({
            index: 0,
            routes: [{name: 'Home', params: {id, friends}}],
        });
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('ent', ent);
        await AsyncStorage.setItem('schoolRNE', schoolRNE);
        if (schoolName) await AsyncStorage.setItem('schoolName', schoolName);
    } else if (!id) {
        Alert.alert("Connexion au serveur refusée", "Identifiant et/ou mot de passe invalide(s).");
    } else {
        Alert.alert("Échec de la connexion", "Connexion au serveur impossible. Veuillez réessayer ultérieurement.");
    }
    loadingCallback(false);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        top: 2,
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
        padding: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'green',
        margin: 10,
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#23ac3ff'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    }
});
