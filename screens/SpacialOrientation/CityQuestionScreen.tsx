import {useState, useEffect} from  "react"
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";

import RNPickerSelect from 'react-native-picker-select';
import SecondaryButton from "../../components/SecondaryButton";
import { GlobalState, optionsSelect } from "../../types/types";
import { incrementValue } from "../../constants/constants";
import { progressActions } from "../../reducers";
import * as Location from 'expo-location';


const cityArray: string[] = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Cúcuta",
    "Bucaramanga",
    "Pereira",
    "Santa Marta",
    "Ibagué",
    "Soacha",
    "Villavicencio",
    "Neiva"
];

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
        textAlign: 'center'
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


const generateCityArray = (): Array<optionsSelect> => {
    const monthsOptions: Array<optionsSelect> = [];

    cityArray.map((city, i) => {
        
        monthsOptions.push({ label: city, value: city});

    });

  


  
    return monthsOptions;
};




export default function CityQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);
    const [answer, setAnswer] = useState<string>('');
    const [options, setOptions] = useState<optionsSelect[]>([])

    useEffect(() => {

        setOptions(generateCityArray());

    }, [])


    const onSubmit = () => {

        const actualCountry = 'Cali'; 
        if(answer === actualCountry){

            dispatch({
                type: 'examInfo/setOrientationCityQuestion',
                payload: 1
            });

        } else {
            dispatch({
                type: 'examInfo/setOrientationCityQuestion',
                payload: 0
            });
        }

        dispatch({
            type: 'examSection/setExamSection',
            payload: 'Concentración'
        });



        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        
        navigation.navigate("RepeatWordIntroScreen");

    }





    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>
                <View style={styles.title}>

                    <QuestionTitle  text="¿En que ciudad estamos?"></QuestionTitle>
                </View>

                <View style={styles.inputContainer}>
                    <RNPickerSelect
                    placeholder={{label: 'Selecciona un ciudad', value: null }}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setAnswer(value)}        
                    items={options}/> 
                </View>


                {answer !== null && <SecondaryButton text="Siguiente" action={() => onSubmit}></SecondaryButton> }
            </View>


        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});


