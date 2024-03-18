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
        justifyContent: 'center',
        
        width: '70%'
    },
    input:{
        marginTop: 86,
        marginBottom: 48,
        marginHorizontal: 12,
        backgroundColor: '#092C4C',
        borderTopColor: '#092C4C',
        borderEndColor: '#092C4C',
        borderStartColor: '#092C4C',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '30%',
    }

});


export default function BirthInputScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // const prevProgress = useSelector((state: GlobalState) => state.totalProgress)

    const [nameAnswer, setNameAnswer] = useState<string>('');


    const submit = () => {
        navigation.navigate('InfoScreen');

        dispatch({
            type: 'userInfo/setName',
            payload: nameAnswer
        });

        dispatch(progressActions.actions.setTotalProgress(0.033));
    }

    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>

                <QuestionTitle text='¿Cuando nació?'></QuestionTitle>
                <QuestionText text='Indique su fecha de nacimiento'></QuestionText>
                <View style={styles.inputContainer}>
                    <TextInput onChangeText={(text) => setNameAnswer(text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Mes" ></TextInput>
                    <TextInput onChangeText={(text) => setNameAnswer(text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Dia" ></TextInput>
                    <TextInput onChangeText={(text) => setNameAnswer(text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Año" ></TextInput>

                </View>

                {nameAnswer ? <SecondaryButton text="Siguiente" action={() => submit}></SecondaryButton> : null}

            </View>
        </View>

    );


}