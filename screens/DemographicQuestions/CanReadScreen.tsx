import { useState } from "react";
import { View, StyleSheet } from "react-native";
import QuestionText from "../../components/QuestionText";
import QuestionTitle from "../../components/QuestionTitle";
import { TextInput, Text } from "react-native-paper";
import Header from "../../components/Header";
import { useDispatch, useSelector} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "../../components/SecondaryButton";
import { progressActions } from "../../reducers";
import { GlobalState } from "../../types/types";
import { incrementValue } from "../../constants/constants";
import YesButton from "../../components/YesButton";
import NoButton from "../../components/NoButton";


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
    inputContainer:{
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        
        width: '70%'
    }

});


export default function CanReadScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress)




    

    const affirmativeAnswer = () => {

        
        dispatch({
            type: 'userInfo/setCanRead',
            payload: true
        });
        
        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("CanWriteScreen");
    }

    const negativeAnswer = () => {

        
        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("CanWriteScreen");
    }


    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>

                <QuestionTitle text='¿Sabe leer?'></QuestionTitle>
                <QuestionText text='Indique si tiene la capacidad de leer'></QuestionText>
                <View style={styles.inputContainer}>
                    <YesButton text="Sí" action={() => affirmativeAnswer}></YesButton>
                    <NoButton text="No" action={() => negativeAnswer}></NoButton>


                </View>

            </View>
        </View>

    );


}