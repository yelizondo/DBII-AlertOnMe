import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";


export default function Confirmer(props){
    const [text, setText] = useState(0);
    const onChange = pText => setText(pText);

    return (
        <View>
            <Dialog.Container visible={props.visible}>
                <Dialog.Title>{props.title}</Dialog.Title>
                <Dialog.Description>{props.description}</Dialog.Description>
                <Dialog.Input 
                    secureTextEntry={true}
                    onChangeText={onChange}
                />
                <Dialog.Button label="Cancel" onPress={props.cancel} />
                <Dialog.Button label="Enter" onPress={()=>props.enter(text)} />
            </Dialog.Container>
        </View>
    );
}