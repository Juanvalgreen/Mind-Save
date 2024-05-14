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

// TODO: Should refactor when the spike of speech recognition its done

export default function RepeatSentenceIntroScreen(){
    const [sound, setSound] = useState<any>();
    const navigation = useNavigation();


   

    const handleContinue = () => {


        navigation.navigate("RepeatSentenceQuestionScreen");

    }


   const playSound = async () =>  {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../../../assets/niNoniSiniPero.mp3')
    );
    setSound(sound);


    console.log('Playing Sound');
    await sound.playAsync();
  }

 

    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>


                <View style={styles.title}>

                    <QuestionTitle  text="Escuche la frase con atención y memorice para despues repetirla"></QuestionTitle>
                    <QuestionText text="Oprima el botón para escuchar la frase, solo sonarán UNA vez">
                    </QuestionText>
                    {/* <QuestionText text="tendrá que repetirlas"> */}
                    {/* </QuestionText> */}
                    
                </View>
                {!sound && <PrimaryButton text="Reproducir la frase" action={() => playSound}></PrimaryButton>}
                { sound &&
                <View style={styles.warningText}> 
                    <SecondaryButton text="Avance a repetirla" action={() => handleContinue}></SecondaryButton>
                </View> }

                {/*Should refactor with proper logic*/}




            </View>


        </View>
    )
}




