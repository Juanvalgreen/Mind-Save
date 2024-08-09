import { Button, Text, Image, View, StyleSheet, Pressable, ImageBackground, ScrollView } from "react-native";
import SecondaryButton from "../components/SecondaryButton";
import { useNavigation } from "@react-navigation/native";
import { CONSTANTS_TEXT } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 80,
    width: 200,
    height:200
  },
  textContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight:'300',
  },
  buttonContainer: {
    marginTop: 20,
  }
});

export default function InfoScreen() {
  const navigation = useNavigation();

  const navigateStart = () => {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/LogoBackground.png')} style={styles.imageBackground}>
        <Image source={require('../assets/Logo (2).png')} style={styles.logo} />
        <ScrollView contentContainerStyle={styles.textContainer}>
          <Text style={styles.text}>{CONSTANTS_TEXT.INFO_TEXT}</Text>
        </ScrollView>
          <View style={styles.buttonContainer}>
            <SecondaryButton text="Volver al inicio" action={() => navigateStart}></SecondaryButton>
          </View>
      </ImageBackground>
    </View>
  );
}
