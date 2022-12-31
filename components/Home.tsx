import {StyleSheet, View} from 'react-native';
import Navigation from './Navigation';
import {NativeStackScreenProps} from "@react-navigation/native-stack";

export default function Home({route, navigation}: NativeStackScreenProps<any, "Home">): JSX.Element {
    return <View style={styles.app}>
        <Navigation route={route} navigation={navigation} friends={route.params?.friends ?? []}/>
    </View>;
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
});