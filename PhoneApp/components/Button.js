import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Button(props){
    return (
        <View style={styles.view}>
            <TouchableOpacity
                onPress={props.action}
            >
                <Text style={styles.text}> {props.text} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        backgroundColor: "#30334d",
        width: '25%',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});