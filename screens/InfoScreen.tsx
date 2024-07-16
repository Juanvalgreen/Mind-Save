import {useEffect, useState} from "react"
import { Text, View } from "react-native"
import { useSelector } from "react-redux";
import { GlobalState } from "../types/types";
import { postNewExam } from "../services/exams";
import PrimaryButton from "../components/PrimaryButton";

export default function InfoScreen() {


    const examInfo = useSelector((state: GlobalState) => state.examInfo)
    const userInfo = useSelector((state: GlobalState) => state.userInfo)


        const sendData = () => {
            const dataToSend = {
                userInfo: userInfo,
                examInfo: examInfo,
            };
            console.log('Data being sent:', dataToSend);
            postNewExam(dataToSend)
        }
    
    
    
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <PrimaryButton text="Enviar Data" action={() => sendData}></PrimaryButton>
        <Text> Informacion de la prueba</Text>
        <Text>{JSON.stringify(examInfo)}</Text>
        </View>
    )
    
}


