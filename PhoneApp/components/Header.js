import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.text}> {props.title} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#30334d',
        height: '15%',
        width: '100%',
        flex: 0
    },
    text: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: '15%'
    }
})