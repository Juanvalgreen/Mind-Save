import {useState, useEffect} from  "react"
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";

import RNPickerSelect from 'react-native-picker-select';
import { optionsSelect } from "../../types/types";
import SecondaryButton from "../../components/SecondaryButton";



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


const generateMonthDayArray = (): Array<optionsSelect> => {
    const monthsDayOptions: Array<optionsSelect> = [];

    for(let i = 0; i <= 31; i++){

        monthsDayOptions.push({ label: `Día ${i}`, value: i});
    }
    
  


  
    return monthsDayOptions;
};




export default function MonthDayQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<number>(0);
    const [options, setOptions] = useState<optionsSelect[]>([])

    useEffect(() => {

        setOptions(generateMonthDayArray());
        console.log(new Date().getUTCDate()-1);

    }, [])


    const onSubmit = () => {

        const actualDayMonth = new Date().getUTCDate() - 1; 
        if(answer === actualDayMonth){

            dispatch({
                type: 'examInfo/setOrientationMonthDayQuestion',
                payload: 1
            });

        } else {
            dispatch({
                type: 'examInfo/setOrientationMonthDayQuestion',
                payload: 0
            });
        }

        
        navigation.navigate("WeekDayQuestionScreen");

    }





    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>
                <View style={styles.title}>

                    <QuestionTitle  text="¿En que día del mes estamos?"></QuestionTitle>
                </View>

                <View style={styles.inputContainer}>
                    <RNPickerSelect
                    placeholder={{label: 'Selecciona un día del mes', value: null }}
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


