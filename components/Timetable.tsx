import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';

export type Lesson = {
    id: string;
    from: number;
    to: number;
    isDetention: boolean;
    remoteLesson: boolean;
    status: string | undefined;
    hasDuplicate: boolean;
    isAway: boolean;
    isCancelled: boolean;
    color: string;
    subject: string;
    teacher: string;
    room: string;
}

export default function Timetable(props: { timetable: Lesson[], name: string }): JSX.Element {
    return <ScrollView style={{backgroundColor: 'white'}}>
        {props.timetable.length > 0 ? props.timetable.map((element) => {
            if((element.isCancelled || element.isAway) && (element.hasDuplicate || props.timetable.find(e => e.from === element.from && !e.isCancelled && !e.isAway))) return;
            const renderStatus = (): JSX.Element | undefined => {
                if (!element.status) return;
                return <Text
                    style={[styles.status, (!element.isCancelled && !element.isAway) && {backgroundColor: '#6ec2f8'}]}>{element.status}</Text>;

            }
            const renderHour = (timestamp: number, end: boolean): string => {
                const date = new Date(timestamp);
                return `${date.getUTCHours()}h${date.getUTCMinutes()}`;
            }
            return <Card key={element.id}
                      style={[{backgroundColor: 'white'}, (element.isCancelled || element.isAway) && {backgroundColor: '#f6f6f6'}]}>
                    <View style={styles.cours}>
                        <View style={styles.heures}>
                            <Text style={{textAlign: 'right'}}>{renderHour(element.from, false)}</Text>
                            <Text style={{textAlign: 'right', marginTop: 35}}>{renderHour(element.to, true)}</Text>
                        </View>
                        <View style={[styles.couleurMatiere, {backgroundColor: element.color}]}/>
                        <View style={styles.infos}>
                            <Text style={styles.matiere}>{element.subject}</Text>
                            <Text>{element.teacher}</Text>
                            <Text>{element.room}</Text>
                        </View>
                        {renderStatus()}
                    </View>
                </Card>;
        }) : <Card style={{top: 250, padding: 5, marginHorizontal: 10}}>
            <Text style={{textAlign: 'center'}}><Text style={{fontWeight: 'bold'}}>{props.name}</Text> n'a
                pas de cours pour aujourd'hui.</Text>
        </Card>}
    </ScrollView>;
}

const styles = StyleSheet.create({
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
        backgroundColor: '#eb4b43',
        color: 'white',
        right: -60,
        top: 50,
        zIndex: 999,
        padding: 2,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    heures: {
        width: 45,
    },
    cours: {
        height: 61,
        flexDirection: "row",
        marginVertical: 20,
        marginLeft: 32,
        marginRight: 71
    },
    couleurMatiere: {
        width: 6,
        height: 75,
        borderRadius: 100,
        marginLeft: 4
    },
    matiere: {
        fontWeight: 'bold'
    },
    infos: {
        width: 300,
        marginLeft: 8,
    },
})