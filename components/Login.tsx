// noinspection JSIgnoredPromiseFromCall

import {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput, View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import getSchools from '../api/EducationAPI.mjs';
import {getCAS, login} from '../api/PronoteAPI.mjs';
import {Dropdown} from 'react-native-element-dropdown';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

let lastQuery: string | null = null;

export default function Login(props: any): JSX.Element {
    const [defaultEntries, setDefaultEntries] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);

    const [ent, setENT] = useState<string | null>(null);
    const [isFocusENT, setIsFocusENT] = useState<boolean>(false);
    const [entData, setENTData] = useState<{ label: string, value: string }[]>([]);

    const [school, setSchool] = useState<string | null>(null);
    const [isFocusSchool, setIsFocusSchool] = useState<boolean>(false);
    const [schoolsData, setSchoolsData] = useState<{ label: string, value: string }[]>([]);
    const [schoolQuery, setSchoolQuery] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const renderENT = (): JSX.Element | null => (ent || isFocusENT)
        ? (<Text style={[styles.label, isFocusENT && {color: 'green'}]}>ENT</Text>)
        : null;

    const renderSchool = (): JSX.Element | null => (school || isFocusSchool)
        ? (<Text style={[styles.label, isFocusSchool && {color: 'green'}]}>École</Text>)
        : null;

    const renderConnect = (): JSX.Element =>
        isLoading
            ? <ActivityIndicator size="large" color="green"/>
            : <Button title='Se Connecter' color='green' onPress={(): void => {
                setIsLoading(true);
                tryLogin(props.navigation, setIsLoading, username, password, ent, school);
                setTimeout(() => setIsLoading(false), 10000);
            }}/>

    if (entData.length === 0) (async (): Promise<void> => setENTData(await getCAS()))();

    (async (query: string): Promise<void> => {
        if (query === lastQuery) return; // Prevents refresh too fast (laggy + rate limited)
        const data: any = await getSchools(query);
        setSchoolsData(data);
        lastQuery = query
    })(schoolQuery);

    if (!defaultEntries) (async (): Promise<void> => {
        const username: string = await AsyncStorage.getItem('username') ?? '';
        const password: string = await AsyncStorage.getItem('password') ?? '';
        const ent: string | null = await AsyncStorage.getItem('ent') ?? null;
        const school: string | null = await AsyncStorage.getItem('school') ?? null;

        setUsername(username);
        setPassword(password);
        setENT(ent);
        setSchool(school);
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
                            !school && {borderColor: 'black'},
                            isFocusSchool && {borderColor: 'blue'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={schoolsData}
                        search
                        searchQuery={(keyword): boolean => {
                            setSchoolQuery(keyword);
                            return true;
                        }}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={school ? school : (!isFocusSchool ? 'Rechercher votre établissement publique' : '...')}
                        searchPlaceholder="Rechercher"
                        value={school}
                        onFocus={(): void => setIsFocusSchool(true)}
                        onBlur={(): void => setIsFocusSchool(false)}
                        onChange={(item): void => {
                            setSchool(item.value);
                            setIsFocusSchool(false);
                        }}
                    />
                </View>
                {renderConnect()}
            </Card>
        </SafeAreaView>
    );
}

async function tryLogin(navigation: NativeStackNavigationProp<any>, loadingCallback: (value: boolean) => void, username: string, password: string, ent: string | null, school: string | null): Promise<void> {
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
    } else if (!school) {
        loadingCallback(false);
        Alert.alert("Connexion impossible", "Vous devez sélectionner un établissement.");
        return;
    }
    const id = await login(username, password, ent, school);
    if (id > 0) {
        navigation.navigate('Home', {id});
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
        });
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('ent', ent);
        await AsyncStorage.setItem('school', school);
    } else if (!id) {
        Alert.alert("Connexion au serveur refusée", "Identifiant et/ou mot de passe invalide(s).");
    } else {
        Alert.alert("Échec de la connexion", "Connexion au serveur impossible. Veuillez réessayer ultérieurement.");
    }
    loadingCallback(false);
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
        backgroundColor: '#f6f3f8',
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
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
