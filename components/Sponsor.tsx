import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Card} from 'react-native-paper';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {useState} from "react";

const TopTab = createMaterialTopTabNavigator();

const Invited = (): JSX.Element => {
    const [code, setCode] = useState<string>('');
    return <View>
        <Card style={styles.container}>
            <Text style={styles.title}>Entrer un code de parrainage:</Text>
            <View style={{flexDirection: 'row', marginVertical: 15}}>
                <TextInput
                    style={styles.codeInput}
                    placeholder="Code de Parrainage"
                    placeholderTextColor="gray"
                    value={code}
                    maxLength={5}
                    onChangeText={newValue => setCode(newValue)}
                    cursorColor='green'
                />
            </View>
        </Card>
    </View>;
};

const Invite = (): JSX.Element => <View>
    <Card style={styles.container}>
        <Text style={styles.title}>Voici votre code de parrainage:</Text>
        <View style={{flexDirection: 'row', marginVertical: 15, justifyContent: 'center'}}>
            <Text selectable={true} selectionColor='green' style={styles.parrainage}>ABCDEF</Text>
        </View>
    </Card>
</View>;

export default function Sponsor(): JSX.Element {
    return <TopTab.Navigator screenOptions={{
        tabBarIndicatorStyle: {
            backgroundColor: 'green'
        }
    }}>
        <TopTab.Screen name={"J'ai été invité"} component={Invited}/>
        <TopTab.Screen name={"J'invite"} component={Invite}/>
    </TopTab.Navigator>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 225,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'green',
    },
    codeInput: {
        margin: 15,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        padding: 5,
        marginRight: 2,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    parrainage: {
        borderWidth: 2,
        padding: 10,
        fontSize: 30,
        color: 'white',
        backgroundColor: 'green',
        borderColor: 'black',
    }
});