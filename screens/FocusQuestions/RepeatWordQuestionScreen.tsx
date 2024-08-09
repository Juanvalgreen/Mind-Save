import {useState, useEffect} from  "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";
import QuestionText from "../../components/QuestionText";
import { incrementValue } from "../../constants/constants";
import { progressActions } from "../../reducers";

import Voice from "@react-native-voice/voice";
import PrimaryButton from "../../components/PrimaryButton";
import { GlobalState } from "../../types/types";
import SecondaryButton from "../../components/SecondaryButton";

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
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: 86,
        marginBottom: 48,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '70%',
    },
    input: {
        width: '100%',
    },
    warningText: {
        marginVertical: 12,
        color: 'red',
        fontSize: 18,
        fontWeight: '400',
    },
    logoMicro: {
        margin: 20
    }
});

export default function RepeatWordQuestionScreen() {
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
        console.log('stopped');
    };

    Voice.onSpeechError = (error) => {
        setError(error);
        console.log(error);
    };

    Voice.onSpeechResults = (result) => {
        setVoiceResult(result.value ? result.value[0] : undefined);
        console.log('results', result);
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
    };

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
    };

    const confirmCorrectAnswer = () => {
        let pointsCounter = 0;

        if (voiceResult) {
            voiceResult.includes('cuchara') && pointsCounter++;
            voiceResult.includes('manzana') && pointsCounter++;
            voiceResult.includes('bicicleta') && pointsCounter++;
        }

        return pointsCounter;
    };

    const handleContinue = () => {
        Voice.destroy();

        dispatch({
            type: "examInfo/setFixationRepeatWordsQuestion",
            payload: confirmCorrectAnswer(),
        });

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        dispatch({
            type: 'examSection/setExamSection',
            payload: 'Atención y cálculo'
        });

        navigation.navigate("MinusSequenceQuestionScreen");
    };

    return (
        <View style={styles.container}>
            <Header />
            {isRecording && <Image source={require('../../assets/microphone.png')} style={styles.logoMicro}/>}
            <View style={styles.questionContainer}>
                <View style={styles.title}>
                    <QuestionTitle text="Repita las palabras que escuchó" />
                    <QuestionText text="Cuando este listo, oprima el botón y repita las palabras" />
                </View>

                {!voiceResult && !isRecording && (
                    <PrimaryButton text="Empezar a repetir" action={() => startRecording} />
                )}
                {voiceResult && (
                    <SecondaryButton text="Siguiente" action={() => handleContinue} />
                )}
            </View>
        </View>
    );
}
