import { StyleSheet, Text } from "react-native"

type titleProps = {
    text: string
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: '#CCECE4',
        fontWeight: '700',
        textAlign: 'center'
    }
})

export default function QuestionTitle({text} : titleProps){


    return(
        <Text style={styles.text}>{text}</Text>
    )
    
}