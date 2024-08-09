import { useEffect, useRef, useState } from "react";
import { View, StyleSheet,Image } from "react-native";
import QuestionTitle from "../../../components/QuestionTitle";
import Header from "../../../components/Header";
import { useDispatch, useSelector} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "../../../components/SecondaryButton";
import { progressActions } from "../../../reducers";
import { GlobalState } from "../../../types/types";
import { incrementValue } from "../../../constants/constants";
import { Camera, CameraType, CameraCapturedPicture } from "expo-camera";
import { CORRECT_CONDITION } from "../../../constants";
import { handUpValidate } from "../../../services/vertex";

import * as ImageManipulator from 'expo-image-manipulator';



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
    logoCamera: {
        margin: 20
    }

});


export default function SayInstructionQuestionScreen(){
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prevProgress = useSelector((state: GlobalState) => state.totalProgress);

    const cameraRef = useRef<Camera>(null);   
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(false);


    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: microphoneStatus } = await Camera.requestMicrophonePermissionsAsync();
            if (cameraStatus !== 'granted' || microphoneStatus !== 'granted') {
                console.log("Permisos no otorgados");
                return;
            } else {
                console.log("Permisos otorgados");
            }
        })();

        const timer = setTimeout(async () => {
            if (cameraReady && cameraRef.current) {
                try {
                    await takePicture();
                } catch (error) {
                    console.error("Error en el proceso de toma de foto:", error);
                }
            } else {
                console.log("Referencia de la cámara no disponible o cámara no lista");
            }
        }, 6000); // Aumentado a 8 segundos

        return () => clearTimeout(timer);
    }, [cameraReady]);


    const takePictureWithTimeout = async (timeout = 3000) => {
        return Promise.race([
            cameraRef.current.takePictureAsync({ quality: 0.2, base64: true, exif: false, scale: 0 }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), timeout)
            )
        ]);
    };

    const takePicture = async () => {
        if (cameraRef.current && cameraRef.current.takePictureAsync) {
            try {
                console.log("Antes de takePictureAsync");
                const photo: CameraCapturedPicture = await takePictureWithTimeout();
                console.log("Después de takePictureAsync");

                if (photo.base64) {
                    
                    const resizedImage = await ImageManipulator.manipulateAsync(
                        photo.uri,
                        [{ resize: { width: 640 } }], // Ajusta el ancho a 640 píxeles
                        { compress: 0.5, base64: true }
                    );                    
                    
                    console.log("Longitud de base64:", resizedImage.base64.length);
                    try {
                        const {response} = await handUpValidate(resizedImage.base64);
                        console.log('Response desde el componente', response);
                        setIsButtonEnabled(true);
                        
                        if (response && typeof response === 'string' && CORRECT_CONDITION.some(el => response.toLowerCase().includes(el))) {
                            console.log('levanto la mano');
                            setCorrectAnswer(true);
                        }
                    } catch (error) {
                        console.error("Error en la validación:", error);
                    }
                } else {
                    console.log("La foto no tiene datos base64");
                }
            } catch (error) {
                console.error("Error específico en takePictureAsync:", error);
            }
        } else {
            console.log("takePictureAsync no está disponible en cameraRef.current");
        }
    };

    const handleCameraReady = () => {
        console.log("Cámara lista");
        setCameraReady(true);
    };
    

    const handleContinue = () => {

        dispatch(progressActions.actions.setTotalProgress(prevProgress + incrementValue));

        
        dispatch({
            type: 'examInfo/setLanguageSayInstructionsQuestion',
            payload: 1
        });
        

        navigation.navigate("WriteSencetenceQuestionScreen");
        
    }

    

    return (
        <View style={styles.container}>
            <Header />
            <Image source={require('../../../assets/camera.png')} style={styles.logoCamera} />
            
            <View style={styles.questionContainer}>
                <QuestionTitle text='Siga la instrucción que escuchó' />
                <View style={[styles.inputContainer, isButtonEnabled && styles.isEnable]}>
                    <Camera 
                        ref={cameraRef} 
                        style={styles.cam}
                        type={CameraType.front}
                        onCameraReady={handleCameraReady}
                    />
                </View>
                {isButtonEnabled && <SecondaryButton text="Siguiente" action={() => handleContinue} />}
            </View>
        </View>

    );


}