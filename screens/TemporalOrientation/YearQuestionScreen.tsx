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


const generateYearsArray = (): Array<optionsSelect> => {
    const currentYear = new Date().getFullYear();
    const years: Array<{ label: string; value: number }> = [];
  
    for (let i = 0; i < 9; i++) {
        const randomYear = Math.floor(Math.random() * (currentYear - 1900 + 1)) + 1900;
        years.push({ label: `${randomYear}`, value: randomYear });
    }
  
    years.push({ label: `${currentYear}`, value: currentYear });
  
    years.sort(() => Math.random() - 0.5);
  
    return years;
};




export default function YearQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

    const [answer, setAnswer] = useState<number>(0);
    const [options, setOptions] = useState<optionsSelect[]>([])

    useEffect(() => {
        setOptions(generateYearsArray())
    }, []);




    const onSubmit = () => {

        const actualYear = new Date().getFullYear(); 
        if(answer === actualYear){

            dispatch({
                type: 'examInfo/setOrientationYearQuestion',
                payload: 1
            });

        } else {
            dispatch({
                type: 'examInfo/setOrientationYearQuestion',
                payload: 0
            });
        }

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("HourQuestionScreen");

    }





    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>
                <QuestionTitle text="¿En Que Año Estamos?"></QuestionTitle>

                <View style={styles.inputContainer}>
                    <RNPickerSelect
                    placeholder={{label: 'Selecciona un año', value: 0}}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setAnswer(value)}        
                    items={options}/> 
                </View>


                {answer !== 0 && <SecondaryButton text="Siguiente" action={() => onSubmit}></SecondaryButton> }
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


