import { Button, Pressable, StyleSheet, Text } from "react-native"

type ButtonProps = {
    text: string,
    action: Function
}

const styles = StyleSheet.create({
    Button: {
        width: 85,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
        marginBottom: 22,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#CCECE4',
    },
    TextButton: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#007759',
    }

});





export default function YesButton({text, action} : ButtonProps){








    return(
        <Pressable style = {styles.Button} onPress={action()}>
            <Text style = {styles.TextButton}>{text}</Text>
        </Pressable>
    )
}