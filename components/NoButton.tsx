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
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        elevation: 3,
        backgroundColor: '#ECCCCC',
    },
    TextButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#770000',
    }

});





export default function NoButton({text, action} : ButtonProps){








    return(
        <Pressable style = {styles.Button} onPress={action()}>
            <Text style = {styles.TextButton}>{text}</Text>
        </Pressable>
    )
}