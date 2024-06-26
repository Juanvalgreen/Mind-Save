import {useState, useEffect} from  "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";

import { GlobalState, optionsSelect } from "../../types/types";
import SecondaryButton from "../../components/SecondaryButton";
import QuestionText from "../../components/QuestionText";

import { progressActions } from "../../reducers";
import { incrementValue } from "../../constants";


import Voice from "@react-native-voice/voice";
import PrimaryButton from "../../components/PrimaryButton";





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





export default function RememberWordsQuestionScreen(){
    
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

            voiceResult.includes('cuchara') && pointsCounter++ ;
            voiceResult.includes('manzana') && pointsCounter++ ;
            voiceResult.includes('bicicleta') && pointsCounter++ ;
            
            

        }

        return pointsCounter
    }

    const handleContinue = () => {

        Voice.destroy();

        dispatch({
            type: "examInfo/setMemoryRememberWordsQuestion",
            payload: confirmCorrectAnswer(),
        });

        dispatch({
            type: 'examSection/setExamSection',
            payload: 'Lenguaje'
        });

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("ObjectIdentificationIntroScreen");


    }
    
    
    
    
    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>

                <View style={styles.title}>

                    <QuestionTitle  text="Repita las 3 palabras que escuchó antes"></QuestionTitle>
                    <QuestionText text="Cuando este listo oprima el boton y repita las 3 palabras">
                    </QuestionText>
                    
                    {/*Should refactor with proper logic*/}

                </View>

                {!voiceResult && <PrimaryButton text="Empezar a repetir" action={() => startRecording}></PrimaryButton>}
                {voiceResult && <PrimaryButton text="Siguiente" action={() => handleContinue}></PrimaryButton>}


            </View>


        </View>
    )
}