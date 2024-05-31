import { useState } from "react";
import { View, StyleSheet } from "react-native";
import QuestionText from "../../components/QuestionText";
import QuestionTitle from "../../components/QuestionTitle";
import { TextInput } from "react-native-paper";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "../../components/SecondaryButton";
import { progressActions } from "../../reducers";
import { GlobalState } from "../../types/types";
import { incrementValue } from "../../constants";


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
    input:{
        marginTop: 86,
        backgroundColor: '#092C4C',
        borderTopColor: '#092C4C',
        borderEndColor: '#092C4C',
        borderStartColor: '#092C4C',
        marginBottom: 48,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '70%',
    }

});

//TODO: Should be refactro
export default function WriteSencetenceQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress)

    const [answer, setAnswer] = useState<string>('');


    const submit = () => {
        navigation.navigate("InfoScreen");

        dispatch({
            type: 'examInfo/setLanguageWriteSentenceQuestion',
            payload: answer
        });

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
    }

    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>

                <QuestionTitle text='Escriba una frase completa'></QuestionTitle>
                <QuestionText text='La frase debe tener sentido al leerla'></QuestionText>
            
                <TextInput onChangeText={(text) => setAnswer(text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Frase" ></TextInput>

                {answer ? <SecondaryButton text="Siguiente" action={() => submit}></SecondaryButton> : null}

            </View>
        </View>

    );


}