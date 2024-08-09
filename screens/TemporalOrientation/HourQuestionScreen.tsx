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
import QuestionText from "../../components/QuestionText";




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


const generateHoursArray = () : Array<optionsSelect> => {
    const currentHour = new Date().getHours();
    const hours: Array<optionsSelect> = [];

    // Add the current hour, the next hour, and the previous hour
    const prevHour = (currentHour - 1 + 24) % 24;
    const nextHour = (currentHour + 1) % 24;

    hours.push({ label: `${prevHour}:00`, value: prevHour });
    hours.push({ label: `${currentHour}:00`, value: currentHour });
    hours.push({ label: `${nextHour}:00`, value: nextHour });

    // Fill the rest of the array with random hours
    while (hours.length < 9) {
        const randomHour = Math.floor(Math.random() * 24);
        // Ensure no duplicate hours
        if (!hours.some(hour => hour.value === randomHour)) {
            hours.push({ label: `${randomHour}:00`, value: randomHour });
        }
    }

    // Shuffle the array to make the correct hour not too obvious
    hours.sort(() => Math.random() - 0.5);

    return hours;
};


const findClosestHour = (selectedHour: number, currentHour: number): boolean => {
    const nextHour = (currentHour + 1) % 24;
    const prevHour = (currentHour - 1 + 24) % 24;

    return selectedHour === currentHour || selectedHour === nextHour || selectedHour === prevHour;
};

export default function HourQuestionScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

    const [answer, setAnswer] = useState<number>(0);
    const [options, setOptions] = useState<optionsSelect[]>([]);

    useEffect(() => {
        setOptions(generateHoursArray());
    }, []);

    const onSubmit = () => {
        const actualHour = new Date().getHours();
        const isCorrect = findClosestHour(answer, actualHour);

        dispatch({
            type: 'examInfo/setOrientationHourQuestion',
            payload: isCorrect ? 1 : 0
        });

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        navigation.navigate("MonthQuestionScreen");
    };



    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>
                <View style={styles.title}>

                    <QuestionTitle  text="¿Aproximadamente que horas son?"></QuestionTitle>
                    <QuestionText  text="Escoga la hora más cercana"></QuestionText>
                </View>

                <View style={styles.inputContainer}>
                    <RNPickerSelect
                    placeholder={{label: 'Selecciona una hora', value: 0}}
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