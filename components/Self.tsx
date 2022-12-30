import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import type {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

export default function Self({navigation}: BottomTabScreenProps<any>): JSX.Element {
    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}><FontAwesome color={'green'} name={'id-card-o'}
                                                        size={20}/><View style={{paddingHorizontal: 5}}/>Profil</Text>
            </Card>
            <Card style={styles.card}>
                <Text style={styles.title}><Octicons color={'green'} name={'feed-star'}
                                                        size={20}/><View style={{paddingHorizontal: 5}}/>Points</Text>
            </Card>
            <Card style={styles.card}>
                <Text style={styles.title}><MaterialCommunityIcons color={'green'} name={'progress-check'}
                                                                   size={22}/><View style={{paddingHorizontal: 4}}/>Objectifs</Text>
            </Card>
        </ScrollView>
    )
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