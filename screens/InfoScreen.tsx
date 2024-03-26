import {useEffect, useState} from "react"
import { Text, View } from "react-native"
import { useSelector } from "react-redux";
import { GlobalState } from "../types/types";

export default function InfoScreen() {

    const [answerInfo, setAnswerInfo] = useState<any>(useSelector((state: GlobalState) => state.examInfo));

    // useEffect(() => {
    //     const examInfo: any = ;

    //     setAnswerInfo(examInfo)

    // }, [])
    
    
    
    
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <Text> Informacion de la prueba</Text>
        <Text>{JSON.stringify(answerInfo)}</Text>
        </View>
    )
    
}


