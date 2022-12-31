import {ScrollView} from 'react-native';

export type Mark = {
    id: string,
    type: number,
    subject: {
        id: string,
        name: string,
        type: number,
        color: string,
    },
    title: string,
    value?: number,
    scale: number,
    average?: number,
    defaultScale: number,
    coefficient: number,
    min?: number,
    max?: number,
    date: number,
    period: {
        id: string,
        name: string,
    },
    isAway?: boolean,
    isGroupMark?: boolean;
}
export default function Marks(props: { marks: Mark[], name: string }): JSX.Element {
    return <ScrollView style={{backgroundColor: 'white'}}>

    </ScrollView>;
}