import {Button,Text,Image,View,StyleSheet,Pressable,ImageBackground,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"; 

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import InfoScreen from "./InfoScreen";
import QuestionTitle from "../components/QuestionTitle";
import QuestionText from "../components/QuestionText";
import Header from "../components/Header";
import { GlobalState, UserInfo } from "../types/types";
import { progressActions } from "../reducers";
import getCurrentDate from "../utils/string";
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#092C4C",
        justifyContent: 'space-between'
        

    },
    questionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
  
export default function SelectEvaluatorScreen() {

    const dispatch = useDispatch();


    const navigation = useNavigation();
  
    const nameInput = () => {
      navigation.navigate("NameInputScreen");

      dispatch(progressActions.actions.setTotalProgress(0.001));
      dispatch({
            type: 'examInfo/setApplicationDate',
            payload: getCurrentDate()
        });

    };
  


    

  
    return (
        <View style={styles.container}>
            <Header></Header>

            <View style={styles.questionContainer}>

                <QuestionTitle text='¿Quién será evaluado?'></QuestionTitle>
                <QuestionText text='Escoge una opción' ></QuestionText>

                <PrimaryButton text="Yo mismo" action={() => nameInput} ></PrimaryButton>
                <SecondaryButton text="Evaluaré a alguien más" action={() => nameInput} ></SecondaryButton>
            </View>
        </View>
    );
  }