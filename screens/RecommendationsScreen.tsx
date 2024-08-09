import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import QuestionTitle from "../components/QuestionTitle";
import SecondaryButton from "../components/SecondaryButton";
import { CONSTANTS_TEXT } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { AnalysisState, GlobalState } from "../types/types";
import QuestionText from "../components/QuestionText";

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
    logo: {
        marginTop: 40,
        marginBottom: 20,
        width: '60%', 
        height: undefined, 
        aspectRatio: 6, 
        resizeMode: 'contain'
    },
});

export default function RecommendationScreen() {
    const navigation = useNavigation();

    const recommendations = useSelector((state: GlobalState) => state.analysis.recommendations);
    console.log(recommendations);

    const navigateStart = () => {
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <Header />
                <View style={styles.contentContainer}>
                    <QuestionTitle text={CONSTANTS_TEXT.TEST_RECOMENDATIONS_TITLE} />
                    <Image source={require('../assets/Mindsave.png')} style={styles.logo} />
                    <ScrollView contentContainerStyle={styles.textContainer}>
                        <Text style={styles.text}>{CONSTANTS_TEXT.TEST_RECOMENDATIONS_DISCLAIMER}</Text>
                        {recommendations?.map((advice : string, index) =>(

                            <Text key={index} style={styles.text}>{advice}</Text>
                        ))}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <SecondaryButton text="Volver al inicio" action={() => navigateStart} />
                    </View>
                </View>
        </View>
    );
}
