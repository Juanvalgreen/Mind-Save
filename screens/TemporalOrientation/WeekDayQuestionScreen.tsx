import {useState, useEffect} from  "react"
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";

import RNPickerSelect from 'react-native-picker-select';
import { GlobalState, optionsSelect } from "../../types/types";
import SecondaryButton from "../../components/SecondaryButton";
        import { incrementValue } from "../../constants/constants";
import { progressActions } from "../../reducers";

const weekDaysArray = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
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


const generateWeekArray = (): Array<optionsSelect> => {
    const monthsOptions: Array<optionsSelect> = [];

    weekDaysArray.map((day, i) => {
        
        monthsOptions.push({ label: day, value: i });

    });

  


  
    return monthsOptions;
};




export default function WeekDayQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<number>(0);
    const [options, setOptions] = useState<optionsSelect[]>([])
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);
    
    useEffect(() => {

        setOptions(generateWeekArray());

    }, [])


    const onSubmit = () => {

        const actualWeekDay = new Date().getDay() ; 
        console.log(actualWeekDay, answer);
        if(answer === actualWeekDay){

            dispatch({
                type: 'examInfo/setOrientationWeekDayQuestion',
                payload: 1
            });

        } else {
            dispatch({
                type: 'examInfo/setOrientationWeekDayQuestion',
                payload: 0
            });
        }

        dispatch({
            type: 'examSection/setExamSection',
            payload: 'Orientación espacial'
        });



        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        
        navigation.navigate("CountryQuestionScreen");

    }





    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>
                <View style={styles.title}>

                    <QuestionTitle  text="¿En que día de la semana estamos?"></QuestionTitle>
                </View>

                <View style={styles.inputContainer}>
                    <RNPickerSelect
                    placeholder={{label: 'Selecciona un día', value: null }}
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


