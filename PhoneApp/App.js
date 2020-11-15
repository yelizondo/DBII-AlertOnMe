import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';
import Header from './components/Header'
import Button from './components/Button'
import Selector from './components/Selector';
import Input from './components/Input';

export default function App() {
  const [id, getId] = useState('');
  const onPress = () => getId(prevCount => uuid.v4() );
  const [selectedTime, setSelectedTime] = useState("5");
  const onSelect = (itemValue, itemIndex) => setSelectedTime(itemValue);
  const beginTracking = () => {console.log("Aquí empieza a seguir")};

  return (
  <View style={styles.container}>
    <Header title='Alert On Me!' />
    <Selector prompt='For how long will you like to be tracked?'/>
    <Input text="Insert a 3 digit pin"/>
    <Button text='Track me' action = {beginTracking} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f5',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
