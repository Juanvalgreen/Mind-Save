import { SetStateAction, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import QuestionText from "../../../components/QuestionText";
import QuestionTitle from "../../../components/QuestionTitle";
import { TextInput, Text } from "react-native-paper";
import Header from "../../../components/Header";
import { useDispatch, useSelector} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "../../../components/SecondaryButton";
import { progressActions } from "../../../reducers";
import { GlobalState } from "../../../types/types";
import { incrementValue } from "../../../constants";
import YesButton from "../../../components/YesButton";
import NoButton from "../../../components/NoButton";
import { Camera } from "expo-camera";
import PrimaryButton from "../../../components/PrimaryButton";


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
    inputContainer: {
        margin: 48,
        

        width: '90%',
        height: '60%',
        borderRadius: 24,
        overflow: 'hidden'
    },
    cam: {
        flex: 1,
        borderRadius: 24,
    },
    isEnable: {
        borderColor: '#7CE9CD',
        borderWidth:3

    },

});


export default function SayInstructionQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    let cameraRef = useRef(null);   
    const [video,setVideo] = useState();

    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
            await Camera.requestMicrophonePermissionsAsync();
        })();


        const timer = setTimeout(() => {
            setIsButtonEnabled(true);
        }, 5500);

        return () => clearTimeout(timer);

    }, []);


  let recordVideo = () => {
        let options = {
        quality: "1080p",
        maxDuration: 60,
        mute: false
        };

        cameraRef.current.recordAsync(options).then((recordedVideo : any) => {
            setVideo(recordedVideo);
        });

        console.log('wow')

    };

    let stopRecording = () => {
        cameraRef.current.stopRecording();
        console.log(video);
    };


    

    const handleContinue = () => {

        
        dispatch({
            type: 'examInfo/setLanguageSayInstructionsQuestion',
            payload: 1
        });
        
        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        navigation.navigate("WriteSencetenceQuestionScreen");

        
    }




    

    return (
        <View style={styles.container}>
            
            <Header></Header>
            <View style={styles.questionContainer}>
                <QuestionTitle text='Siga la instrucción que escucho' />


                <View style={[styles.inputContainer, isButtonEnabled && styles.isEnable]}>

                    <Camera 
                    ref={cameraRef} 
                    style={styles.cam}
                    type={Camera.Constants.Type.front} >
                    </Camera>


                </View>

                {isButtonEnabled && <SecondaryButton text="Siguiente" action={() => handleContinue} ></SecondaryButton>}

            </View>
        </View>

    );


}