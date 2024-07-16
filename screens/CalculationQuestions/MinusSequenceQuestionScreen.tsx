import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Header from "../../components/Header";
import QuestionText from "../../components/QuestionText";
import QuestionTitle from "../../components/QuestionTitle";
import SecondaryButton from "../../components/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { progressActions } from "../../reducers";
import { GlobalState } from "../../types/types";
import { incrementValue } from "../../constants/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#092C4C",
    justifyContent: "space-between",
  },
  questionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "75%",
    marginBottom : 26
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#092C4C",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "30%",
    color: "white",
  },
});

const INITIAL_NUMBER = 100;

export default function MinusSequenceQuestionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

  const [answers, setAnswers] = useState([`${INITIAL_NUMBER}`, "", "", "", "", ""]);
  const [showButton, setShowButton] = useState(false);

  const handleInputChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);

    const allFilled = newAnswers.every((answer) => answer !== "");
    setShowButton(allFilled);
  };


  const confirmCorrectAnswer = (): number => {
    let correctCounter = 0;
  
  
    // Verify that each answer is the result of subtracting multiples of 7 from the initial number 100
    for (let i = 1; i < answers.length; i++) {
      const currentNumber = parseInt(answers[i], 10);
      const expectedNumber = INITIAL_NUMBER- (i * 7);
      if (currentNumber === expectedNumber) {
        correctCounter++;
      }
    }
  
    return correctCounter;
  };
  

  const submit = () => {

    dispatch({
      type: "examInfo/setCalcAttentionMinusSequenceQuestion",
      payload: confirmCorrectAnswer(),
    });

    dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

   
    navigation.navigate("ReverseSpellingQuestionScreen");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.questionContainer}>
        <QuestionTitle text="Debe restar de 7 en 7, desde 100" />
        <QuestionText text="En cada espacio siga la secuencia" />
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            {answers.slice(0, 3).map((answer, index) => (
              <TextInput
                key={index}
                onChangeText={(text) => handleInputChange(index, text)}
                value={answer}
                theme={{ colors: { onSurface: "white"}}} 
                style={styles.input}
                placeholderTextColor="white"
                keyboardType="numeric"
                textColor="white"
                disabled = {index === 0}
              />
            ))}
          </View>
          <View style={styles.inputRow}>
            {answers.slice(3).map((answer, index) => (
              <TextInput
                key={index + 3}
                onChangeText={(text) => handleInputChange(index + 3, text)}
                value={answer}
                theme={{ colors: { onSurface: "white"}}} 
                style={styles.input}
                placeholderTextColor="white"
                keyboardType="numeric"
              />
            ))}
          </View>
        </View>
        {showButton && <SecondaryButton text="Siguiente" action={() => submit} />}
      </View>
    </View>
  );
}
