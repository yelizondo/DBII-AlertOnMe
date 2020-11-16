import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function Input(props) {
    const [text, setText] = useState();
    const onChange = pText => {
        if (pinValidator.test(pText)) {
            props.changer(pText);
            setText(pText)};
        }
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={onChange}
                value = {text}
                secureTextEntry={true}
            />
        </View>
    );
};

const pinValidator = /^[0-9]{0,3}$/;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '15%'
    },
    input: {
        fontSize: 16,
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        borderColor: "#30334d",
        borderWidth: 1,
        minWidth: '60%'
    }
});