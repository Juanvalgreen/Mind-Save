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


export default function ProfessionInputScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress)

    const [professionAnswer, setProfessionAnswer] = useState<string>('');


    const submit = () => {
        // navigation.navigate("BirthInputScreen");

        dispatch({
            type: 'userInfo/setProfession',
            payload: professionAnswer
        });

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        navigation.navigate('YearQuestionScreen')
    }

    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>

                <QuestionTitle text='¿Que profesión tiene?'></QuestionTitle>
                <QuestionText text='Escriba cual es su ocupación'></QuestionText>
            
                <TextInput onChangeText={(text) => setProfessionAnswer(text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Ocupación" ></TextInput>

                {professionAnswer ? <SecondaryButton text="Siguiente" action={() => submit}></SecondaryButton> : null}

            </View>
        </View>

    );


}