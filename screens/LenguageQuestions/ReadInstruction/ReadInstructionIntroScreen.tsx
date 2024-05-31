import {useState, useEffect} from  "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../../components/Header";
import QuestionTitle from "../../../components/QuestionTitle";
import { Audio } from 'expo-av';
import QuestionText from "../../../components/QuestionText";

import Voice from "@react-native-voice/voice";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";





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
        marginBottom: 25
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
        marginTop: 48
    }

});


export default function ReadInstructionIntroScreen(){
   
    const navigation = useNavigation();


   

    const handleContinue = () => {


        navigation.navigate("ReadInstructionQuestionScreen");

    }


 

    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>


                <View style={styles.title}>

                    <QuestionTitle  text="A continuación siga la instrucción que se le muestre en pantalla"></QuestionTitle>
                    <QuestionText text="Oprima el botón siguiente cuando este listo">
                    </QuestionText>
                    
                </View>

                    <SecondaryButton text="Siguiente" action={() => handleContinue}></SecondaryButton>





            </View>


        </View>
    )
}




