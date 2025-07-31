import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export const ButtonSubmit: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        top: 20,
        backgroundColor: '#f49696ff',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
    },
    disabled: {
        backgroundColor: '#A9A9A9',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ButtonSubmit;