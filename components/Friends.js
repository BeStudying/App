import React from 'react';
import { Button, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function Friends({ navigation }) {
  return (
    <ScrollView>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 1</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 2</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 3</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 4</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 5</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 6</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 7</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 8</Text>
      </Card>
      <Card style={{margin: 15, padding: 25}}>
        <Text>Amis 9</Text>
      </Card>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
    }
})
