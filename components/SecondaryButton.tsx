import { Button, Pressable, StyleSheet, Text } from "react-native"

type ButtonProps = {
    text: string,
    action: Function
}

const styles = StyleSheet.create({

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
      secondaryTextButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#007759',
      },

});


export default function SecondaryButton({text, action} : ButtonProps){

    return(
        <Pressable style = {styles.secondaryButton} onPress={action()}>
            <Text style = {styles.secondaryTextButton}>{text}</Text>
        </Pressable>
    )
}