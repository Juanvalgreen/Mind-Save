
import {useState, useEffect} from  "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../../components/Header";
import QuestionTitle from "../../../components/QuestionTitle";

import { GlobalState, optionsSelect } from "../../../types/types";
import SecondaryButton from "../../../components/SecondaryButton";
import QuestionText from "../../../components/QuestionText";

import Voice from "@react-native-voice/voice";
import PrimaryButton from "../../../components/PrimaryButton";





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





// TODO: Should refactor when the spike of speech recognition its done
export default function ObjectIdentificationIntroScreen(){
    
    const dispatch = useDispatch();
    const navigation = useNavigation();



    const startInputs = () => {

        navigation.navigate("ObjectIdentificationPencilScreen");
        
    } 




    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>

                <View style={styles.title}>

                    <QuestionTitle  text="Diga el nombre del objeto"></QuestionTitle>
                    <QuestionText text="Cuando esté listo, se van a mostrar 2 objetos y debe decir el nombre de cada uno." />
                    

                    

                </View>

                <PrimaryButton text="Listo" action={() => startInputs} />


            </View>


        </View>
    )
}