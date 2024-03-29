import Main from './components/Main';
import Home from './components/Home';
import CGU from './components/CGU';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from "react-native";
import Settings from "./components/Settings";
import {AddFriend} from "./components/Friends";
import {Scan} from "./components/Login";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
    LogBox.ignoreLogs([
        'Constants.platform.ios.model has been deprecated in favor of expo-device\'s Device.modelName property. This API will be removed in SDK 45.',
        'Possible Unhandled Promise Rejection'
    ]); // TODO: À retirer si tu sais d'où sa vient
    return <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                title: 'PROMATE', headerStyle: {
                    backgroundColor: 'green',
                }, headerTintColor: '#fff', headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: 'center',
                }, headerBackVisible: false,
            }}>
                <Stack.Group>
                    <Stack.Screen
                        name="Main"
                        component={Main}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{
                    presentation: 'modal', headerStyle: {
                        backgroundColor: 'white',
                    }, headerTintColor: 'black', headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }} headerBackButtonMenuEnabled>
                    <Stack.Screen
                        name="CGU"
                        component={CGU}
                        options={{headerTitle: "Conditions Générales d'Utilisation"}}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{headerTitle: "Paramètres"}}
                    />
                    <Stack.Screen
                        name="AddFriend"
                        component={AddFriend}
                        options={{
                            headerShown: false, contentStyle: {
                                marginTop: 500,
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Scan"
                        component={Scan}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    </GestureHandlerRootView>;
}

export function test(...args) {
    console.log(...args);
    return true;
}