import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonProps = {
    text: string,
    action: Function,
    enabled?: boolean
}

const styles = StyleSheet.create({
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
    disabledButton: {
        backgroundColor: '#52626D',
    },
    primaryTextButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});

export default function PrimaryButton({ text, action, enabled = true }: ButtonProps) {
    return (
        <Pressable 
            style={[styles.primaryButton, !enabled && styles.disabledButton]} 
            onPress={enabled ? action() : null}
        >
            <Text style={styles.primaryTextButton}>{text}</Text>
        </Pressable>
    );
}
