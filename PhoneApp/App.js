import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {v4 as uuid} from 'uuid';
import Header from './components/Header';
import Button from './components/Button';
import Selector from './components/Selector';
import Input from './components/Input';
import Report from './api_comms/Report';
import Pinpoint from './api_comms/Pinpoint';
import * as Location from 'expo-location';
import Confirmer from './components/Confirmer';
import BackgroundTimer from 'react-native-background-timer';

export default function App() {
  // hook for adding state to the app
  const [session, updateSession] = useState({
    uuid: -1,
    latitude: -1,
    longitude: -1,
    pin: -1,
    time: 5,
    tracking: false
  });

  // hook for Dialog handling
  const [visible, updateDialog] = useState(false);

  // hook for ensuring having permission for location services
  useEffect(()=>{
    Location.getPermissionsAsync()
    .then(status=>{
      if (!status.granted){
        Location.requestPermissionsAsync();
      }
    });
  }, []);


  // hook for starting track
  useEffect(()=>{
    if (session.tracking){
      // console.log(session);
      
      let remaining = session.time*60000
      
      BackgroundTimer.runBackgroundTimer(() => { 
        if (remaining <= 0){
          BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
          updateDialog(true)
        }
        console.log("Eso");
        console.log(remaining);
        remaining-=1000;
        // Report(session.uuid, session.latitude, session.longitude);
        }, 
        5000);
    }
    }, [session.tracking]);


  // cancel function for Confirmer 
  const cancelVerification = ()=>{
    updateDialog(false);
    console.log("Registrar que quedó abierta la sesión");
  }

  // enter function for Confirmer
  const enterVerification = (pPin)=>{
    if(pPin==session.pin){
      console.log("Registrar que se completó con éxito");
    } else {
      console.log("Registrar que quedó abierta la sesión");
    }
    updateDialog(false);
  }
  

  // function for pin Input
  const setPin = pPin =>{
    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: pPin,
      time: session.time,
      tracking: session.tracking
    })
  }
  

  // function for time Selector
  const setTime = pTime =>{
    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: session.pin,
      time: pTime,
      tracking: session.tracking
    })
    // updateTimer(pTime*60000)
  }
  
  // function for Button
  // gets all of the pertinent data and prepares backend call (Report)
  const beginTracking = () => {
    Pinpoint()
    .then(({coords:{latitude, longitude}})=>{
        updateSession({
          uuid: uuid(),
          latitude: latitude,
          longitude: longitude,
          pin: session.pin,
          time: session.time,
          tracking: true
        });
    })
  }

  // hay que llamar a algo distinto de beginTracking
  // const timer = () => {
  //   setInterval((beginTracking), 5000);
  //   setTimeout(function() { 
  //     clearInterval(interval); 
  //   }, 60000 * session.time);
  // }

  // app JSX
  return (
  <View style={styles.container}>
    <Header title='Alert On Me!' />
    <Selector prompt='For how long will you like to be tracked?' action={setTime}/>
    <Input placeholder="Insert a 3 digit pin" changer={setPin}/>
    <Confirmer 
        title='Confirm arrival' 
        description='Enter the pin provided at the beginning' 
        visible={visible}
        cancel={cancelVerification}
        enter={enterVerification}
    />
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
