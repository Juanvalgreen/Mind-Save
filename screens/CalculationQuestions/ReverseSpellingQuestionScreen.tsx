import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Header from "../../components/Header";
import QuestionText from "../../components/QuestionText";
import QuestionTitle from "../../components/QuestionTitle";
import SecondaryButton from "../../components/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { progressActions } from "../../reducers";
import { GlobalState } from "../../types/types";
import { incrementValue } from "../../constants";
import PrimaryButton from "../../components/PrimaryButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#092C4C",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 32,
    marginTop: 12
  },
  questionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    width: "75%",
    marginBottom : 26
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#092C4C",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "18%",
    color: "white",
    textAlign: "center"
  },
});

const WORD_TO_SPELL = 'MUNDO';

export default function ReverseSpellingQuestionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [showButton, setShowButton] = useState(false);
  const [showInput, setShowInput ] = useState(false);
  const [showReadyButton, setShowReadyButton] = useState(true);

  const handleInputChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);

    const allFilled = newAnswers.every((answer) => answer !== "");
    setShowButton(allFilled);
  };


  const confirmCorrectAnswer = (): number => {
    let correctCounter = 0;
  
    // Convertir la palabra al revés a minúsculas
    const reversedWordLowerCase = WORD_TO_SPELL.toLowerCase().split('').reverse().join('');
  
    // Verificar que cada respuesta sea correcta
    for (let i = 0; i < answers.length; i++) {
      // Convertir la respuesta ingresada por el usuario a minúsculas
      const userAnswerLowerCase = answers[i].toLowerCase();
      if (userAnswerLowerCase === reversedWordLowerCase[i]) {
        correctCounter++;
      }
    }
  
    return correctCounter;
  };
  

  const submit = () => {

    dispatch({
      type: "examInfo/setCalcAttentionSpellingQuestion",
      payload: confirmCorrectAnswer(),
    });

    dispatch({
      type: 'examSection/setExamSection',
      payload: 'Memoria'
    });

    dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

    // Navegar a la siguiente pantalla
    navigation.navigate("RememberWordsQuestionScreen");
  };


  const startInputs = () => {
    setShowInput(true);
    setShowReadyButton(false);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.questionContainer}>
        <QuestionTitle text="Deletree esta palabra al revés " />
        {!showInput && <QuestionText text="Cuando haya memorizado la palabra, oprima el boton e inicie a deletrear"></QuestionText>}
        {showInput && <QuestionText text="Deletree al revés la palabra que memorizó"></QuestionText>}

        { showInput ?

          <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            {answers.map((answer, index) => (
              <TextInput
                key={index}
                onChangeText={(text) => handleInputChange(index, text)}
                value={answer}
                theme={{ colors: { onSurface: "white"}}} 
                style={styles.input}
                placeholderTextColor="white"
                textColor="white"
                maxLength={1}
                />
                ))}
          </View>
        </View> :
        <>
        
          <View style={styles.inputContainer}>

            <Text style={styles.text}>{WORD_TO_SPELL}</Text>

          </View> 
        {showReadyButton && <PrimaryButton text="Empiece a deletrear" action={() => startInputs} />}

        
        </>
        }
        {showButton && <SecondaryButton text="Siguiente" action={() => submit} />}
      </View>
    </View>
  );
}
