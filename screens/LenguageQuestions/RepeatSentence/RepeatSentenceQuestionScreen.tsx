import {useState, useEffect} from  "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../../components/Header";
import QuestionTitle from "../../../components/QuestionTitle";
import { Audio } from 'expo-av';
import QuestionText from "../../../components/QuestionText";
import { progressActions } from "../../../reducers";
import { incrementValue } from "../../../constants";

import Voice from "@react-native-voice/voice";
import PrimaryButton from "../../../components/PrimaryButton";
import { GlobalState } from "../../../types/types";




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
        marginBottom: 20
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
    }

});

// TODO: Should refactor when the spike of speech recognition its done

export default function RepeatSentenceQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);


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
    
    const stopRecording = async () => {
        if (Voice) {
            try {
                await Voice.stop();
                console.log('stop');
            } catch (error) {
                setError(error);
            }
        } else {
            console.log('Voice es nulo');
        }
    }

    const confirmCorrectAnswer = () => {

        let pointsCounter = 0;

        if(voiceResult) {

            voiceResult.includes('ni no ni sí ni pero') && pointsCounter++ ;

            
            

        }

        return pointsCounter
    }

    const handleContinue = () => {

        Voice.destroy();

        dispatch({
            type: "examInfo/setLanguageRepeatSentence",
            payload: confirmCorrectAnswer(),
        });

        dispatch({
            type: 'examSection/setExamSection',
            payload: ''
        });


        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("ReadInstructionIntroScreen");

    }



    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>

                {voiceResult ? <Text>{voiceResult}</Text> : null}

                <View style={styles.title}>

                    <QuestionTitle  text="Repita la frase que escuchó"></QuestionTitle>
                    <QuestionText text="Cuando este listo, oprima el botón y repita la frase">
                    </QuestionText>


                </View>


                {!voiceResult && <PrimaryButton text="Empezar a repetir" action={() => startRecording}></PrimaryButton>}
                {voiceResult && <PrimaryButton text="Siguiente" action={() => handleContinue}></PrimaryButton>}




            </View>


        </View>
    )
}




