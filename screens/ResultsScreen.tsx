import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../types/types";
import Header from "../components/Header";
import QuestionTitle from "../components/QuestionTitle";
import SecondaryButton from "../components/SecondaryButton";
import { CONSTANTS_TEXT } from "../constants";
import { useNavigation } from "@react-navigation/native";
import QuestionText from "../components/QuestionText";
import { postNewExam } from "../services/exams";
import { analysisActions } from "../reducers";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#092C4C",
        justifyContent: 'space-between'
    },
    contentContainer: {
        marginTop: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        gap: 24
    },
    text: {
        fontSize: 20,
        lineHeight: 29,
        fontWeight: '300',
        textAlign: 'center',
        color: 'white'
    },
    boldText: {
        fontWeight: 'bold',
        color: 'white'
    },
    buttonContainer: {
        marginTop: 20,
    },
    brain: {
        marginBottom: 40,
        width: 300,
        height: 300
    },
});

export default function ResultsScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const examInfo = useSelector((state: GlobalState) => state.examInfo);
    const userInfo = useSelector((state: GlobalState) => state.userInfo);

    useEffect(() => {
        sendNewExamWithRetry();
    }, []);

    const navigateToRecommendations = () => {
        navigation.navigate("RecommendationScreen");
    };

    const sendNewExamWithRetry = async (retries = 3) => {
        try {
            const dataToSend = {
                userInfo: userInfo,
                examInfo: examInfo,
            };

            const response = await postNewExam(dataToSend);

            if (!isValidResponse(response.response)) {
                throw new Error("Respuesta inválida del servidor");
            }

            console.log(response.response.recommendations);
            setAnalysis(response.response);
            dispatch(analysisActions.actions.setRecommendations(response.response.recommendations));
            setLoading(false);
        } catch (e) {
            console.log('Error en el componente', e);
            if (retries > 0) {
                console.log(`Reintentando... Intentos restantes: ${retries - 1}`);
                setTimeout(() => sendNewExamWithRetry(retries - 1), 1000); // Espera 2 segundos antes de reintentar
            } else {
                setError("No se pudo obtener el análisis después de varios intentos. Por favor, inténtalo de nuevo más tarde.");
                setLoading(false);
            }
        }
    }

    const isValidResponse = (response: any) => {
        return response && 
               response.patientInfo && 
               response.totalScore && 
               response.examResults &&
               response.examResults.orientation &&
               response.examResults.fixation &&
               response.examResults.calcAttention &&
               response.examResults.memory &&
               response.examResults.language;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>{error}</Text>
                    <SecondaryButton text="Intentar de nuevo" action={() => {
                        setLoading(true);
                        setError(null);
                        sendNewExamWithRetry();
                    }} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            {loading ? (
                <View style={styles.contentContainer}>
                    <Image source={require('../assets/brainstorm.png')} style={styles.brain} />
                    <QuestionText text={CONSTANTS_TEXT.LOADING_RESULTS} />
                </View>
            ) : (
                <View style={styles.contentContainer}>
                    <QuestionTitle text={'Análisis de tus resultados'} />
                    <ScrollView contentContainerStyle={styles.textContainer}>
                        <Text style={styles.text}>{`${analysis?.patientInfo.name} ${CONSTANTS_TEXT.TEST_EXAMPLE_RESULTS_NUMBER} ${analysis?.totalScore.score}/30`}</Text>
                        <Text style={styles.text}>{analysis?.totalScore.analysis}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>Orientación: </Text>{analysis?.examResults.orientation.analysis}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>Fijación: </Text>{analysis?.examResults.fixation.analysis}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>Cálculo y Atención: </Text>{analysis?.examResults.calcAttention.analysis}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>Memoria: </Text>{analysis?.examResults.memory.analysis}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>Lenguaje: </Text>{analysis?.examResults.language.analysis}</Text>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <SecondaryButton text="Siguiente" action={() => navigateToRecommendations} />
                    </View>
                </View>
            )}
        </View>
    );
}