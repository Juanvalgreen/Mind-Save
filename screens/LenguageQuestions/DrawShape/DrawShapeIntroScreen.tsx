
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





export default function DrawShapeIntroScreen(){
    
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);
    const prevPoints = useSelector((state: GlobalState) => state.examInfo.lenguage.objectIdentificationQuestion);


   
    const handleContinue = () => {


    
        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("DrawShapeQuestionScreen");

    }
    
    
    
    
    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>


                <Image source={require('../../../assets/shapes.png')}></Image>

                <View style={styles.title}>

                    <QuestionTitle text="Memorice esta figura" />
                    <QuestionText text="Tendra que dibujarla"/>
                
                </View>

                <PrimaryButton text="Listo" action={() => handleContinue} />


            </View>


        </View>
    )
}