import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View>
            <Text style={styles.header}>BeStudy.</Text>
        </View>
    );
  }

const styles = StyleSheet.create({
    header: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'green',
        paddingTop: '2%',
        paddingBottom: '3%',
        fontWeight: 'bold',
        fontSize: '150%'
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