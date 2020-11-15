import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Selector(props) {
    const [selectedTime, setSelectedTime] = useState("5");
    const onSelect = (itemValue, itemIndex) => setSelectedTime(itemValue);

    return(
        <View>
            <Text style={styles.text}>
                {props.prompt}
            </Text>
            <Picker
                style={styles.picker}
                selectedValue= {selectedTime}
                onValueChange={onSelect}
            >
               <Picker.Item label="5 minutes" value="5" />
               <Picker.Item label="15 minutes" value="15" />
               <Picker.Item label="45 minutes" value="45" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    picker: {
        width: '80%',
        height: '20%'
    },
    text: {
        fontSize: 18,
        paddingTop: '10%'
    }
});