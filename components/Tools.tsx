import type {StyleProp} from 'react-native';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper';
import type {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from 'react-native-vector-icons/Feather';

export default function Tools({navigation}: BottomTabScreenProps<any, 'Outils'>): JSX.Element {
    const renderLink = (): JSX.Element => <View style={styles.link}><Feather name='arrow-up-right'
                                                                             size={15} color='white'/></View>
    return <View style={styles.container}>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                {renderLink()}
                <Text style={styles.title}><AntDesign color={'green'} name={'areachart'}
                                                      size={22}/><View style={{paddingHorizontal: 4}}/>Prono'Bac</Text>
            </Card>
        </Pressable>
        <Pressable style={({pressed}): StyleProp<ViewStyle> => pressed && {opacity: 0.5}}>
            <Card style={styles.card}>
                {renderLink()}
                <Text style={styles.title}><Feather color={'green'} name={'target'}
                                                    size={22}/><View style={{paddingHorizontal: 4}}/>Objectifs</Text>
            </Card>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    card: {
        padding: 20,
        margin: 15,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    link: {
        right: -25,
        bottom: 30,
        backgroundColor: 'rgb(197,197,197)',
        padding: 2,
        borderRadius: 50,
        position: 'absolute',
    }
});