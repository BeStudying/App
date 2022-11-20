import React from 'react';
import { Button, StyleSheet, Text, ScrollView, View, Alert } from 'react-native';
import { Card } from 'react-native-paper';

const friends = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function Friends() {
  return (
    <ScrollView>
      {friends.map((friend) => {
        return(
          <Card style={{margin: 15, padding: 25}}>
            <Text>{friend.title}</Text>
          </Card>
        )
      })}
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
    }
})
