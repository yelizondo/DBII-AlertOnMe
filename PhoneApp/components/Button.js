import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Button(props){
    return (
        <View style={styles.view}>
            <TouchableOpacity
                onPress={props.action}
                style={styles.button}
            >
                <Text style={styles.text}> {props.text} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: '25%',
        height:10,
        flex: 2,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "#30334d"
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});