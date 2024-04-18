import { StyleSheet, Text } from "react-native"

type titleProps = {
    text: string
}

const styles = StyleSheet.create({
    text: {

        fontSize: 18,
        marginTop: 18,
        paddingHorizontal: 22,
        textAlign: 'center',
        color: 'white',
        fontWeight: '300'

    }
});

export default function QuestionText({text} : titleProps){


    return(
        <Text style={styles.text}>{text}</Text>
    )
    
}