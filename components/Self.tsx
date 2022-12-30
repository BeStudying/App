import {ScrollView, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-paper';
import type {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

export default function Self({navigation}: BottomTabScreenProps<any>): JSX.Element {
    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}>🪪 Profil</Text>
            </Card>
            <Card style={styles.card}>
                <Text style={styles.title}>⭐ Points</Text>
            </Card>
            <Card style={styles.card}>
                <Text style={styles.title}>🏆 Objectifs</Text>
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