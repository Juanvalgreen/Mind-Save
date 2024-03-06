import { Button, Text, Image, View, StyleSheet, Pressable, ImageBackground } from "react-native";
import {useNavigation} from '@react-navigation/native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      width: 350,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 48,
      marginBottom: 22,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 24,
      elevation: 3,
      backgroundColor: '#005C9E',
    },
    secondaryButton: {
      width: 350,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 48,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 24,
      elevation: 3,
      backgroundColor: '#CCECE4',
    },
    primaryTextButton: {
      fontFamily: 'Gilroy',
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    secondaryTextButton: {
      fontFamily: 'Gilroy',
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#4CBBA2',
    },
    imageBackground: {
      flex: 1,
      width:400,
      resizeMode: 'cover', 
      justifyContent: 'center'
    }
  });

export default function InitScreen() {

  const navigation = useNavigation();

  const navigateStart = () => {
    navigation.navigate('SelectEvaluator',);
  }

  const navigateInfo = () => {
    navigation.navigate('InfoScreen');
  }



    return(
      <View style={styles.container}>
          <ImageBackground source={require('../assets/LogoBackground.png')} style={styles.imageBackground}>
            <Image source ={require('../assets/Logo (2).png')} />
            <Pressable style = {styles.primaryButton} onPress={() => navigateStart()}>
              <Text style = {styles.primaryTextButton}>Iniciar Evaluacion</Text>

            </Pressable>
            <Pressable style = {styles.secondaryButton} onPress={() => navigateInfo()}>
            <Text style = {styles.secondaryTextButton}>Información</Text>

            </Pressable>

        
          </ImageBackground>
        </View>
    )
}