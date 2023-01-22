// noinspection JSIgnoredPromiseFromCall

import * as React from 'react';
import {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    View,
    ViewStyle
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getSchools from '../api/EducationAPI.mjs';
import {login, loginMobile, loginQr, query} from '../api/PronoteAPI.mjs';
import {Dropdown} from 'react-native-element-dropdown';
import type {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import CInput from "react-native-element-dropdown/src/components/TextInput";
import type {MaterialTopTabScreenProps} from "@react-navigation/material-top-tabs";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Card} from 'react-native-paper';
import type {BarCodeEvent} from "expo-barcode-scanner";
import {BarCodeScanner} from "expo-barcode-scanner";
import Spinner from 'react-native-loading-spinner-overlay';

const TopTab = createMaterialTopTabNavigator();

type PronoteQrCode = {
    jeton?: string,
    login?: string,
    url?: string
}

type LoginMobileRequest = {
    url: string,
    identifiant: string,
    uuid: string,
    jeton: string
}

type LoginMobileResponse = {
    id: number,
    jeton: string
}

type LoginQrResponse = {
    id: number,
    identifiant: string,
    uuid: string,
    jeton: string,
}

export function Scan({navigation}: NativeStackScreenProps<any, 'Scan'>): JSX.Element {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    (async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();

    const handleBarCodeScanned = ({data}: BarCodeEvent) => {
        const error = (e: string): void => {
            Alert.alert('Erreur lors du Scan', e);
        }
        setScanned(true);
        try {
            const auth: PronoteQrCode = JSON.parse(data);
            if (auth?.jeton && auth?.login && auth?.url) {
                navigation.popToTop();
                setScanned(false);
                if (Platform.OS === 'ios') {
                    setTimeout(() => Alert.prompt('Vérification', "Veuillez entrer le code PIN fournis avec votre QR Code", handlePin, 'plain-text', undefined, 'number-pad'), 0);
                    const handlePin = (pin: string): void => {
                        if (!pin) return;
                        else if (pin.length < 4) return error('Le code PIN doit faire 4 caractères.')
                        else if (pin.length > 4) pin = pin.slice(0, 4);
                        loginQr(auth, parseInt(pin)).then((res: LoginQrResponse & { url: string }): void => {
                            if (res.id > 0) {
                                query('friends', res.id, null).then((friends: string[]): void => {
                                    navigation.navigate('Home', {id: res.id, friends});
                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Home', params: {id: res.id, friends}}],
                                    });
                                    AsyncStorage.setItem('url', res.url);
                                    AsyncStorage.setItem('identifiant', res.identifiant);
                                    AsyncStorage.setItem('uuid', res.uuid);
                                    AsyncStorage.setItem('jeton', res.jeton);
                                });
                            } else if (!res.id) error('Le code PIN est invalide et/ou le QR Code a expiré.');
                            else error("Connexion au serveur impossible. Veuillez réessayer ultérieurement.");
                        });
                    }
                }
            } else error("Le QR Code scanné est malformé.");
        } catch (e) {
            error("Ce QR Code est inconnu.");
        }
    };

    if (hasPermission === null) {
        return <Text>⚠ Nous avons besoin d'avoir accès à votre caméra !</Text>;
    } else if (!hasPermission) {
        return <Text> Veuillez nous donner l'accès à votre caméra.</Text>;
    }

    return <View style={styles.qrcode}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        <View style={{
            marginHorizontal: 50,
            padding: 100,
            paddingTop: 150,
            borderColor: 'green',
            borderWidth: 7,
            backgroundColor: 'transparent',
            zIndex: 10000
        }}>
            <View style={{
                borderColor: 'red',
                borderWidth: 3,
                justifyContent: 'center',
                alignContent: 'center',
                width: 261,
                right: 100,
                bottom: 25,
                backgroundColor: 'transparent',
                zIndex: 1000,
            }}/>
        </View>
    </View>;
}
const QrLogin = ({navigation}: MaterialTopTabScreenProps<any>): JSX.Element => {
    return <Card style={styles.container}>
        <Spinner visible={false} textContent={'Loading...'}/>
        <Text style={[styles.buttonText, {color: 'black', padding: 5}]}>Accéder à la Caméra</Text>
        <Pressable onPress={(): void => navigation.getParent()?.navigate('Scan')}>
            <FontAwesome5Icon style={{
                textAlign: 'center',
                margin: 15,
                marginHorizontal: 125,
                padding: 15,
                borderWidth: 1,
                borderColor: 'green'
            }} color='green' name='camera' size={50}/>
        </Pressable>
    </Card>
}

const IdLogin = ({navigation}: MaterialTopTabScreenProps<any>): JSX.Element => {
    const [defaultEntries, setDefaultEntries] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [isFocusUsername, setIsFocusUsername] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);

    const [schoolRNE, setSchoolRNE] = useState<string | undefined>(undefined);
    const [schoolName, setSchoolName] = useState<string | undefined>(undefined);
    const [isFocusSchool, setIsFocusSchool] = useState<boolean>(false);
    const [schoolsData, setSchoolsData] = useState<{ label: string, value: string }[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const renderSchool = (): JSX.Element | null => (schoolRNE || isFocusSchool)
        ? (<Text style={[styles.label, isFocusSchool && {color: 'green'}]}>Établissement</Text>)
        : null;

    const renderConnect = (): JSX.Element =>
        isLoading
            ? <ActivityIndicator size='large' color='green'/>
            : <Pressable style={({pressed}): StyleProp<ViewStyle> => [styles.button,
                pressed && {backgroundColor: 'rgba(35,172,63,0.82)'}]
            } onPress={() => {
                setIsLoading(true);
                tryLogin(navigation.getParent(), setIsLoading, {username, password, schoolRNE, schoolName});
                setTimeout(() => setIsLoading(false), 10000);
            }}>
                <Text style={styles.buttonText}>Se Connecter</Text>
            </Pressable>;

    if (!defaultEntries) (async (): Promise<void> => {
        const username: string = await AsyncStorage.getItem('username') ?? '';
        const password: string = await AsyncStorage.getItem('password') ?? '';
        const schoolRNE: string | undefined = await AsyncStorage.getItem('schoolRNE') ?? undefined;
        const schoolName: string | undefined = await AsyncStorage.getItem('schoolName') ?? undefined;

        setUsername(username);
        setPassword(password);
        setSchoolRNE(schoolRNE);
        setSchoolName(schoolName);
        setDefaultEntries(true);
    })();
    return <Card style={styles.container}>
        <TextInput
            style={[styles.input,
                !username && {borderColor: 'black'},
                isFocusUsername && !isFocusSchool && {borderColor: 'blue'}]}
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
                isFocusPassword && !isFocusSchool && {borderColor: 'blue'}]}
            onFocus={(): void => setIsFocusPassword(true)}
            onBlur={(): void => setIsFocusPassword(false)}
            placeholder="Mot de Passe"
            placeholderTextColor="black"
            secureTextEntry={true}
            value={password}
            onChangeText={(newValue) => setPassword(newValue)}
            cursorColor='green'
        />
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
                placeholder={schoolRNE ? schoolName ?? schoolRNE : "Veuillez rechercher un établissement scolaire (publique)"}
                placeholderStyle={{color: schoolRNE ? 'black' : 'gray'}}
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
                        enablesReturnKeyAutomatically
                        autoComplete='postal-code'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        placeholder="Entrer le code postal de l'établissement"
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
}

export default function Login({navigation}: { navigation: NativeStackNavigationProp<any> }): JSX.Element {
    const [tryMobileAuth, setTriedMobileAuth] = useState<boolean>(false);
    if (!tryMobileAuth) {
        (async (): Promise<void> => {
            const url: string | undefined = await AsyncStorage.getItem('url') ?? undefined;
            const identifiant: string | undefined = await AsyncStorage.getItem('identifiant') ?? undefined;
            const uuid: string | undefined = await AsyncStorage.getItem('uuid') ?? undefined;
            const jeton: string | undefined = await AsyncStorage.getItem('jeton') ?? undefined;
            if (url && identifiant && uuid && jeton) {
                loginMobile({url, identifiant, uuid, jeton}).then((res: LoginMobileResponse): void => {
                    if (res.id > 0) {
                        query('friends', res.id, null).then((friends: string[]): void => {
                            navigation.navigate('Home', {id: res.id, friends});
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'Home', params: {id: res.id, friends}}],
                            });
                            AsyncStorage.setItem('jeton', res.jeton);
                        });
                    }
                });
            }
        })();
        setTriedMobileAuth(true);
    }
    return <TopTab.Navigator screenOptions={{
        tabBarStyle: {
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowRadius: 3,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginHorizontal: 11,
            top: 15,
            elevation: 3,
            zIndex: 999,
        },
        tabBarIndicatorStyle: {
            backgroundColor: 'green',
        },
        animationEnabled: false,
        swipeEnabled: false,
    }}>
        <TopTab.Screen name={'QR Code'} options={{
            tabBarIcon: ({color, focused}) => <FontAwesome5Icon name={'qrcode'} size={25}
                                                                color={focused ? 'green' : color}/>,
        }
        } component={QrLogin}/>
        <TopTab.Screen name={'Identifiants'} options={{
            tabBarIcon: ({color, focused}) => <FontAwesome5Icon name={'key'} size={24}
                                                                color={focused ? 'green' : color}/>,
        }} component={IdLogin}/>
    </TopTab.Navigator>
}

async function tryLogin(navigation: NativeStackNavigationProp<any>, loadingCallback: (value: boolean) => void, {
    username,
    password,
    schoolRNE,
    schoolName
}: { username: string, password: string, schoolRNE?: string, schoolName?: string }): Promise<void> {
    const error = (e: string): void => {
        loadingCallback(false);
        Alert.alert("Connexion impossible", e);
    }

    if (!username) return error("Vous devez entrer un nom d'utilisateur.");
    else if (!password) return error("Vous devez entrer un mot de passe.");
    else if (!schoolRNE) return error("Vous devez sélectionner un établissement.");

    const id = await login(username, password, schoolRNE);
    if (id > 0) {
        const friends: string[] = await query('friends', id, null);
        navigation.navigate('Home', {id, friends});
        navigation.reset({
            index: 0,
            routes: [{name: 'Home', params: {id, friends}}],
        });
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('schoolRNE', schoolRNE);
        if (schoolName) await AsyncStorage.setItem('schoolName', schoolName);
    } else if (!id) error("Identifiant et/ou mot de passe invalide(s).");
    else error("Connexion au serveur impossible. Veuillez réessayer ultérieurement.");
    loadingCallback(false);
}

const styles = StyleSheet.create({
    qrcode: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: '75%',
        borderRadius: 15,
        width: "94%",
        marginHorizontal: "3%",
        paddingVertical: 20,
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
        borderWidth: 2,
        borderColor: '#23ac3f'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    }
});
