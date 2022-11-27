import * as React from 'react';
import { Text, View, ScrollView, StyleSheet} from 'react-native';
import { Card } from 'react-native-paper';

export type Lesson = {
    id: string;
    from: number;
    to: number;
    isDetention: boolean;
    remoteLesson: boolean;
    status: string|undefined;
    hasDuplicate: boolean;
    isAway: boolean;
    isCancelled: boolean;
    color: string;
    subject: string;
    teacher: string;
    room: string;
}

export default function Timetable(props: {timetable: Lesson[]}) {
    return (
        <ScrollView>
        {props.timetable.map((element) => {
            const renderStatus = () => {
                if(!element.status) return;
                return (<Text style={[styles.status]}>{element.status}</Text>);
                
            }
            const renderHour = () => {
                const date = new Date(element.from);
                return `${date.getHours()}:${date.getMinutes()}`;
            }
            return (
                <View>
                <Text style={[styles.hour, {borderColor: element.color}]}>{renderHour()}</Text>
                <Card style={[styles.card, {borderColor: element.color}]} key={element.id}>
                    <Text style={styles.subject}>{element.subject}</Text>
                    <Text>{element.teacher}</Text>
                    {renderStatus()}
                </Card>
                </View>
            );
        })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 15,      
        borderWidth: 2,
    },
    subject : {
        fontWeight: 'bold',
        fontSize: 17,
    },
    hour: {
        position: 'absolute',
        backgroundColor: 'white',
        borderColor: 'black',    
        borderWidth: 1,
        left: 25,
        top: 15,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
    },
    status: {
        position: 'absolute',
        backgroundColor: 'red',
        borderColor: 'black',  
        color: 'white',
        borderWidth: 1,
        left: 200,
        top: 25,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 17,
    },
})