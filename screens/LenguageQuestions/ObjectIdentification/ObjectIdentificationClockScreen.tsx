
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

import { progressActions } from "../../../reducers";
import { incrementValue } from "../../../constants/constants";



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
    }

});





// TODO: Should refactor when the spike of speech recognition its done
export default function ObjectIdentificationClockScreen(){
    
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);
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
    
    };

    Voice.onSpeechError = (error) => {
        setError(error)
        console.log(error);
    };

    Voice.onSpeechResults = (result) => {

        console.log('results', result)

        setVoiceResult(result.value ? result.value[0] : undefined);
            
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


    
        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("RepeatSentenceIntroScreen");

    }
    
    
    
    
    return(
        <View style={styles.container}>
            <Header></Header>
            
            <Text>{voiceResult}</Text>
            <View style={styles.questionContainer}>


                <Image source={require('../../../assets/reloj 1.jpg')}></Image>

                <View style={styles.title}>

                    <QuestionText text="¿Qué es esto?" />
                
                    {/*Should refactor with proper logic*/}
                </View>

                {!voiceResult && <PrimaryButton text="Listo" action={() => startRecording} />}
                {voiceResult && <SecondaryButton text="Siguiente" action={() => handleContinue} />}


            </View>


        </View>
    )
}