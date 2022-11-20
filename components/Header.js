import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function Header() {
    return (
        <View>
            <Text style={styles.title}>BeStudy.</Text>
        </View>
    );
  }

const styles = StyleSheet.create({
    title: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'green',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: '3%',
        fontWeight: 'bold',
        fontSize: '30%'
    }
})

/*
<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Header"
                    component={HomeScreen}
                    options={{
                        title: 'BeStudy.',
                        headerStyle: {
                            backgroundColor: 'green',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
*/