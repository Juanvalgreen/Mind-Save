import { useState } from "react";
import { View, StyleSheet } from "react-native";
import QuestionText from "../../components/QuestionText";
import QuestionTitle from "../../components/QuestionTitle";
import { TextInput, Text } from "react-native-paper";
import Header from "../../components/Header";
import { useDispatch, useSelector} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "../../components/SecondaryButton";
import { progressActions } from "../../reducers";
import { GlobalState } from "../../types/types";
import { incrementValue } from "../../constants";


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
    },
    warningText:{
        marginVertical: 12,
        color: 'red',
        fontSize: 18,
        fontWeight: '400'
    }

});


export default function BirthInputScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

    const [birthAnswer, setBirthAnswer] = useState({
        month: '',
        day: '',
        year: ''
    });

    const [validDate, setValidDate] = useState(true);

    const handleInputChange = (field: string, text: string) => {
        // setValidDate(true);
        setBirthAnswer(prev => ({
            ...prev,
            [field]: text
        }));
    };
    
    const isValidDate = (year: number, month:number, day: number) => {
        const date = new Date(year, month - 1, day); // El mes está indexado en base 0 (enero es 0)
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

    const submit = () => {

        if(!isValidDate(parseInt(birthAnswer.year), parseInt(birthAnswer.month), parseInt(birthAnswer.day))){
            setValidDate(false);
            return
        }

        
        dispatch({
            type: 'userInfo/setName',
            payload: `${birthAnswer.month}/${birthAnswer.day}/${birthAnswer.year}`
        });
        
        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));
        
        navigation.navigate("CanReadScreen");
    }

    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>

                <QuestionTitle text='¿Cuando nació?'></QuestionTitle>
                <QuestionText text='Indique su fecha de nacimiento'></QuestionText>
                <View style={styles.inputContainer}>
                    <TextInput onChangeText={(text) => handleInputChange('day',text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Dia" keyboardType="numeric"></TextInput>
                    <TextInput onChangeText={(text) => handleInputChange('month',text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Mes" keyboardType="numeric"></TextInput>
                    <TextInput onChangeText={(text) => handleInputChange('year',text)} theme={{ colors: { onSurface: "white"}}}  style={styles.input} placeholderTextColor='white' placeholder="Año" keyboardType="numeric" ></TextInput>
                </View>
                {validDate ? null : <Text style={styles.warningText}>Introduzca una fecha valida</Text>}
                {birthAnswer.month && birthAnswer.day && birthAnswer.year.length == 4 ? <SecondaryButton text="Siguiente" action={() => submit}></SecondaryButton> : null}

            </View>
        </View>

    );


}