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


export default function WhereQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress)

    const [answer, setAnswer] = useState<string>('');


    const submit = () => {
        navigation.navigate("InfoScreen");

        const actualYear = 'Universidad'
        if(answer === actualYear){

            dispatch({
                type: 'examInfo/setOrientationWhereWeAreQuestion',
                payload: 1
            });

        } else {
            dispatch({
                type: 'examInfo/setOrientationWhereWeAreQuestion',
                payload: 0
            });
        }
    }

    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>

                <QuestionTitle text='¿Donde estamos ahora?'></QuestionTitle>
                <QuestionText text='Indique donde esta realizando la prueba' ></QuestionText>
            
                <TextInput onChangeText={(text) => setAnswer(text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Ubicación" ></TextInput>

                {answer ? <SecondaryButton text="Siguiente" action={() => submit}></SecondaryButton> : null}

            </View>
        </View>

    );


}