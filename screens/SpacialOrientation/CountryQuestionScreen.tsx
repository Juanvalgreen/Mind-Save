import {useState, useEffect} from  "react"
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";

import RNPickerSelect from 'react-native-picker-select';
import SecondaryButton from "../../components/SecondaryButton";
import { GlobalState, optionsSelect } from "../../types/types";
import { useForegroundPermissions } from "expo-location";
import { incrementValue } from "../../constants/constants";
import { progressActions } from "../../reducers";

const countriesArray: string[] = [
    "Estados Unidos",
    "Canadá",
    "México",
    "Brasil",
    "Argentina",
    "Colombia",
    "Perú",
    "Chile",
    "Reino Unido",
    "Alemania",
    "Francia",
    "Italia",
    "España"
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


const generateCountryArray = (): Array<optionsSelect> => {
    const monthsOptions: Array<optionsSelect> = [];

    countriesArray.map((country, i) => {
        
        monthsOptions.push({ label: country, value: country});

    });

  


  
    return monthsOptions;
};




export default function CountryQuestionScreen(){
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<string>('');
    const [options, setOptions] = useState<optionsSelect[]>([])

    useEffect(() => {

        setOptions(generateCountryArray());

    }, []);


    const onSubmit = () => {

        const actualCountry = 'Colombia'; 
        if(answer === actualCountry){

            dispatch({
                type: 'examInfo/setOrientationCountryQuestion',
                payload: 1
            });

        } else {
            dispatch({
                type: 'examInfo/setOrientationCountryQuestion',
                payload: 0
            });
        }


        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        
        navigation.navigate("DeparmentQuestionScreen");

    }





    return(
        <View style={styles.container}>
            <Header></Header>
            
            <View style={styles.questionContainer}>
                <View style={styles.title}>

                    <QuestionTitle  text="¿En que país estamos?"></QuestionTitle>
                </View>

                <View style={styles.inputContainer}>
                    <RNPickerSelect
                    placeholder={{label: 'Selecciona un país', value: null }}
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


