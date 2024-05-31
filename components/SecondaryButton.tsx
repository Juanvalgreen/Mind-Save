import { Button, Pressable, StyleSheet, Text } from "react-native"

type ButtonProps = {
    text: string,
    action: Function,
    enabled?: boolean
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
        backgroundColor: '#7CE9CD',
      },
    disabledButton: {
        backgroundColor: '#85B4A8',
    },
      secondaryTextButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#007759',
      },

});


export default function SecondaryButton({text, action, enabled = true } : ButtonProps){

    return(
        <Pressable style = {[styles.secondaryButton, !enabled && styles.disabledButton]} onPress={enabled ? action() : null}>
            <Text style = {styles.secondaryTextButton}>{text}</Text>
        </Pressable>
    )
}