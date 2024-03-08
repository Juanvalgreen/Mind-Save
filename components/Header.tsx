import { View, Image, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        marginTop: 42,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row'
        
    }
})

export default function Header(){
    





    return(
        <View style= {styles.container}>
            <Image source={require('../assets/WhiteLogo.png')}></Image>
            <Image source={require('../assets/iconConfig.png')}></Image>
        </View>
    )
}