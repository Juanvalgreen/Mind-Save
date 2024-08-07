
import {useState, useEffect} from  "react"
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../../components/Header";
import QuestionTitle from "../../../components/QuestionTitle";

import { GlobalState, optionsSelect } from "../../../types/types";
import SecondaryButton from "../../../components/SecondaryButton";
import QuestionText from "../../../components/QuestionText";

import Voice from "@react-native-voice/voice";
import PrimaryButton from "../../../components/PrimaryButton";





const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#092C4C",
        justifyContent: 'space-between',
    },
    questionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    title: {
        width: '80%',
        textAlign: 'center',
        marginVertical: 28
    },
    inputContainer:{
        marginTop: 86,
        marginBottom: 48,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '70%'
    },
    input:{
        width: '100%',
    },
    warningText:{
        marginVertical: 12,
        color: 'red',
        fontSize: 18,
        fontWeight: '400'
    },
    logoMicro: {
        margin: 20
    }


});





export default function ObjectIdentificationPencilScreen(){
    
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const prevPoints = useSelector((state: GlobalState) => state.examInfo.lenguage.objectIdentificationQuestion);


    const [voiceResult, setVoiceResult] = useState<string | undefined>('');
    const [error, setError] = useState<any>(null);
    const [isRecording, setIsRecording] = useState(false);

    Voice.onSpeechStart = () => {
        setIsRecording(true);
        console.log(voiceResult);
    };

    Voice.onSpeechEnd = () => {
    
        setIsRecording(false);
        console.log('stopeed');
    
    };

    Voice.onSpeechError = (error) => {
        setError(error)
        console.log(error);
    };

    Voice.onSpeechResults = (result) => {

        setVoiceResult(result.value ? result.value[0] : undefined);

        console.log('results', result)
            
    };

    const startRecording = async () => {
        if (Voice) {
            try {
                await Voice.start('es-CO');
            } catch (error) {
                setError(error);
                console.log(error);
            }
        } else {
            console.log('Voice es nulo');
        }
    }

    const confirmCorrectAnswer = () : number => {

        let points = prevPoints;

        points += voiceResult?.includes('lápiz') ? 1 : 0;

        return points;

    }

    const handleContinue = () => {

        Voice.destroy();

        dispatch({
            type: "examInfo/setLanguageObjectIdentificationQuestion",
            payload: confirmCorrectAnswer(),
        });
        
        navigation.navigate("ObjectIdentificationClockScreen");

    }
    
    
    
    
    return(
        <View style={styles.container}>
            <Header></Header>
            {isRecording && <Image source={require('../../../assets/microphone.png')} style={styles.logoMicro}/>}

            
            <View style={styles.questionContainer}>
                


                <Image source={require('../../../assets/lapiz 1.jpg')}></Image>

                <View style={styles.title}>

                    <QuestionText text="¿Qué es esto?" />
                    <QuestionText text="Oprima El boton cuando este listo para decirlo"/>
                
                </View>

                {!voiceResult && !isRecording && <PrimaryButton text="Listo" action={() => startRecording} />}
                {voiceResult && <SecondaryButton text="Siguiente" action={() => handleContinue} />}



            </View>


        </View>
    )
}