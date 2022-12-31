import type {StyleProp} from 'react-native';
import {Pressable, ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper';
import type {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function Self({navigation}: BottomTabScreenProps<any>): JSX.Element {
    return <ScrollView>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><FontAwesome color={'green'} name={'id-card-o'}
                                                        size={20}/><View
                    style={{paddingHorizontal: 5}}/>Profil</Text>
            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><MaterialCommunityIcons color={'green'} name={'timetable'}
                                                                   size={20}/><View
                    style={{paddingHorizontal: 5}}/>Emploi du Temps</Text>
            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><MaterialCommunityIcons color={'green'} name={'desk'}
                                                                   size={20}/><View
                    style={{paddingHorizontal: 5}}/>Devoirs</Text>
            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><Octicons color={'green'} name={'feed-star'}
                                                     size={20}/><View style={{paddingHorizontal: 5}}/>Notes</Text>

            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><FontAwesome5Icon color={'green'} name={'medal'} size={20}/><View
                    style={{paddingHorizontal: 5}}/>Points</Text>
            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>

                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><MaterialCommunityIcons color={'green'} name={'progress-check'}
                                                                   size={22}/><View style={{paddingHorizontal: 4}}/>Objectifs</Text>
            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                <FontAwesome5Icon name='external-link-alt' style={{position: 'absolute', right: -10, bottom: 25}}
                                  color={'green'}/>
                <Text style={styles.title}><AntDesign color={'green'} name={'areachart'}
                                                      size={22}/><View style={{paddingHorizontal: 4}}/>Prono'Bac</Text>
            </Card>
        </Pressable>
    </ScrollView>
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 15,
        backgroundColor: '#ffffff',
        opacity: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    profil: {}
});