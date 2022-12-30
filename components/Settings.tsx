import {Pressable, SafeAreaView, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import type {NativeStackScreenProps} from "@react-navigation/native-stack";

export default function Settings({navigation}: NativeStackScreenProps<any, 'Settings'>): JSX.Element {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Text style={{textAlign: 'center', marginBottom: 100}}>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</Text>
            <View>
                <Pressable style={({pressed}): StyleProp<ViewStyle> => [styles.button,
                    pressed && {backgroundColor: 'rgb(210, 230, 255)'}]
                } onPress={() => {
                }}>
                    <Text style={styles.buttonText}><FontAwesome color={'green'} name={'support'} size={20}/><View
                        style={{paddingHorizontal: 5}}/>Support</Text>
                </Pressable>
                <Pressable style={({pressed}): StyleProp<ViewStyle> => [styles.button,
                    pressed && {backgroundColor: 'rgb(210, 230, 255)'}]
                } onPress={() => {
                }}>
                    <Text style={styles.buttonText}><AntDesign color={'green'} name={'sharealt'} size={20}/><View
                        style={{paddingHorizontal: 5}}/>Partager l'Application</Text>
                </Pressable>
                <Pressable style={({pressed}): StyleProp<ViewStyle> => [styles.button,
                    pressed && {backgroundColor: 'rgb(210, 230, 255)'}]
                } onPress={() => {
                }}>
                    <Text style={styles.buttonText}><FontAwesome color={'green'} name={'star'} size={18}/><View
                        style={{paddingHorizontal: 5}}/>Noter l'Application</Text>
                </Pressable>
                <Pressable style={({pressed}): StyleProp<ViewStyle> => [styles.button,
                    pressed && {backgroundColor: 'rgb(210, 230, 255)'}]
                } onPress={() => navigation.navigate('CGU')}>
                    <Text style={styles.buttonText}><Ionicons color={'green'} name={'information-circle-outline'}
                                                              size={20}/><View
                        style={{paddingHorizontal: 5}}/>Conditions Générales d'Utilisation</Text>
                </Pressable>
                <Pressable
                    style={({pressed}): StyleProp<ViewStyle> => [styles.button,
                        pressed && {backgroundColor: 'rgb(210, 230, 255)'}]
                    } onPress={() => {
                }}>
                    <Text style={styles.buttonText}><MaterialCommunityIcons color={'green'} name={'scale-balance'}
                                                                            size={20}/><View
                        style={{paddingHorizontal: 5}}/>Mentions Légales</Text>
                </Pressable>
                <Pressable style={({pressed}): StyleProp<ViewStyle> => [styles.button, {
                    marginTop: 50, backgroundColor: 'rgba(255,66,66,0.87)', borderColor: 'black'
                }, pressed && {backgroundColor: 'rgba(255,66,66,0.65)'}]}
                           onPress={() => {
                               navigation.popToTop();
                               navigation.navigate('Main');
                               navigation.reset({
                                   index: 0,
                                   routes: [{name: 'Main'}],
                               });
                           }}>
                    <Text style={[styles.buttonText, {textAlign: 'center', color: 'white'}]}>Déconnexion</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 25,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'rgba(35,172,63,0.04)',
    },
    buttonText: {
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 15,
    }
});
