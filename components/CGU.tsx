import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function CGU(): JSX.Element {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView>
                <Text style={styles.title}>Article 1</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id quam sed
                    est varius congue quis id nunc. Integer tincidunt nisi felis, eu suscipit neque mollis ac. Donec
                    bibendum ipsum sed facilisis rhoncus. Aenean tincidunt felis in ligula aliquet vestibulum. Curabitur
                    suscipit porta lorem, a gravida lorem suscipit quis. Aenean ornare sit amet risus non malesuada.
                    Duis pulvinar tincidunt purus, ornare pretium ex dignissim ac. Sed sapien eros, maximus eget
                    consectetur eget, ornare sit amet ipsum.</Text>
                <Text style={{textAlign: 'center'}}>{"\n"}⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯{""}</Text>
                <Text style={styles.title}>Article 2</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id quam sed
                    est varius congue quis id nunc. Integer tincidunt nisi felis, eu suscipit neque mollis ac. Donec
                    bibendum ipsum sed facilisis rhoncus. Aenean tincidunt felis in ligula aliquet vestibulum. Curabitur
                    suscipit porta lorem, a gravida lorem suscipit quis. Aenean ornare sit amet risus non malesuada.
                    Duis pulvinar tincidunt purus, ornare pretium ex dignissim ac. Sed sapien eros, maximus eget
                    consectetur eget, ornare sit amet ipsum.</Text>
                <Text style={{textAlign: 'center'}}>{"\n"}⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯{""}</Text>
                <Text style={styles.title}>Juridique</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id quam sed
                    est varius congue quis id nunc. Integer tincidunt nisi felis, eu suscipit neque mollis ac. Donec
                    bibendum ipsum sed facilisis rhoncus. Aenean tincidunt felis in ligula aliquet vestibulum. Curabitur
                    suscipit porta lorem, a gravida lorem suscipit quis. Aenean ornare sit amet risus non malesuada.
                    Duis pulvinar tincidunt purus, ornare pretium ex dignissim ac. Sed sapien eros, maximus eget
                    consectetur eget, ornare sit amet ipsum.</Text>
                <Text style={{textAlign: 'center'}}>{"\n"}⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯{""}</Text>
                <Text style={styles.title}>Données</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id quam sed
                    est varius congue quis id nunc. Integer tincidunt nisi felis, eu suscipit neque mollis ac. Donec
                    bibendum ipsum sed facilisis rhoncus. Aenean tincidunt felis in ligula aliquet vestibulum. Curabitur
                    suscipit porta lorem, a gravida lorem suscipit quis. Aenean ornare sit amet risus non malesuada.
                    Duis pulvinar tincidunt purus, ornare pretium ex dignissim ac. Sed sapien eros, maximus eget
                    consectetur eget, ornare sit amet ipsum.</Text>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Refuser"/>
                </View>
                <View style={styles.button}>
                    <Button title="Accepter"/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingVertical: 10,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingHorizontal: 50,
    }
});