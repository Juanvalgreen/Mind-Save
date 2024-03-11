import { Button, Text, Image, View, StyleSheet, Pressable, ImageBackground } from "react-native";
import { UseDispatch, useDispatch } from "react-redux";
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
 
    imageBackground: {
      flex: 1,
      width:400,
      resizeMode: 'cover', 
      justifyContent: 'center',
      alignItems: 'center'
    }

  });

export default function InitScreen() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const navigateStart = () => {
    navigation.navigate('SelectEvaluator',);
    dispatch({
      type: 'userInfo/setName',
      payload: 'Jorge'
    });
    dispatch({
      type: 'examInfo/setOrientationFloorQuestion',
      payload: 22
    });
  }

  const navigateInfo = () => {
    navigation.navigate('InfoScreen');
  }



    return(
      <View style={styles.container}>
          <ImageBackground source={require('../assets/LogoBackground.png')} style={styles.imageBackground}>
            <Image source ={require('../assets/Logo (2).png')} />
            
            <PrimaryButton text="Iniciar Evaluacion" action={() => navigateStart} ></PrimaryButton>
            <SecondaryButton text="Información" action={() => navigateInfo} ></SecondaryButton>

        
          </ImageBackground>
        </View>
    )
}