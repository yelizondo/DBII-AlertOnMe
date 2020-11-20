import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';
import Header from './components/Header';
import Button from './components/Button';
import Selector from './components/Selector';
import Input from './components/Input';
import Report from './api_comms/Report';
import Pinpoint from './api_comms/Pinpoint';
import * as Location from 'expo-location';

export default function App() {
  // hook for adding state to the app
  const [session, updateSession] = useState({
    uuid: -1,
    latitude: -1,
    longitude: -1,
    pin: -1,
    time: 5
  });

  // hook for ensuring having permission for location services
  useEffect(()=>{
    Location.getPermissionsAsync()
    .then(status=>{
      if (!status.granted){
        Location.requestPermissionsAsync();
      }
    });
  }, []);
  

  // function for pin Input
  const setPin = pPin =>{
    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: pPin,
      time: session.time
    })
  }

  // function for time Selector
  const setTime = pTime =>{
    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: session.pin,
      time: pTime
    })
  }
  
  // function for Button
  // gets all of the pertinent data and prepares backend call (Report)
  const beginTracking = () => {
    Pinpoint()
    .then(({coords:{latitude, longitude}})=>{
      updateSession({
        uuid: uuid.v4(),
        latitude: latitude,
        longitude: longitude,
        pin: session.pin,
        time: session.time
      });
    })
    .then(()=>{
      console.log(session);
      Report(session.uuid, session.latitude, session.longitude);
    })
  };

   

  
  // app JSX
  return (
  <View style={styles.container}>
    <Header title='Alert On Me!' />
    <Selector prompt='For how long will you like to be tracked?' action={setTime}/>
    <Input placeholder="Insert a 3 digit pin" changer={setPin}/>
    <Button text='Track me' action = {beginTracking} />
  </View>
  );
};

// Style for app
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f5',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
