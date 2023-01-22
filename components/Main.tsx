import {StyleSheet, View} from 'react-native';
import Login from './Login';
import {NativeStackScreenProps} from "@react-navigation/native-stack";

export default function Main({navigation}: NativeStackScreenProps<any, 'Main'>): JSX.Element {
    return <View style={styles.app}>
        <View style={{paddingBottom: '50%'}}/>
        <Login navigation={navigation}/>
    </View>;
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
});
