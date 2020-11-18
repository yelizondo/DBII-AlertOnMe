import React, { useState, componentDidMount } from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';
import Header from './components/Header'
import Button from './components/Button'
import Selector from './components/Selector';
import Input from './components/Input';
import * as Location from 'expo-location';

export default function App() {
  const [session, updateSession] = useState({
    uuid: -1,
    latitude: -1,
    longitude: -1,
    pin: -1,
    time: 5
  });

  const setPin = pPin =>{
    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: pPin,
      time: session.time
    })
  }

  const setTime = pTime =>{
    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: session.pin,
      time: pTime
    })
  }
  
  // esta función del tracking podría tener el loop 
  // para mandar la info al backend
  const beginTracking = () => {
    session.uuid = uuid.v4();
    console.log(session)
    // console.log(Locate());
  };

  const test = () => {
    // Geolocation.getCurrentPosition(
    //   position => console.log(position),
    //   error => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
    Location.requestPermissionsAsync()
    .then(status => {
      if(status.granted){
        Location.getCurrentPositionAsync({})
        .then(location => {
          console.log(location);
        });
      }
    });
  }
  
  return (
  <View style={styles.container}>
    <Header title='Alert On Me!' />
    <Selector prompt='For how long will you like to be tracked?' action={setTime}/>
    <Input placeholder="Insert a 3 digit pin" changer={setPin}/>
    <Button text='Track me' action = {test} />
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
