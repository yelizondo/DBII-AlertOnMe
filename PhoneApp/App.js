import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {v4 as uuid} from 'uuid';
import Header from './components/Header';
import Button from './components/Button';
import Selector from './components/Selector';
import Input from './components/Input';
import Report from './api_comms/Report';
import Pinpoint from './api_comms/Pinpoint';
import Confirm from './api_comms/Confirm';
import * as Location from 'expo-location';
import Confirmer from './components/Confirmer';

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

  // hook for sending tracking info to backend 
  useEffect(()=>{
    if (session.tracking){
      let remaining = session.time*60000
      const timer = setInterval(()=>{
        Report(session.uuid, session.latitude, session.longitude);
        remaining-=5000
        if (remaining <= 0){
          updateDialog(true);
          clearInterval(timer);
        }
      },5000);
    }
    }, [session.tracking]);


  // cancel function for Confirmer 
  const cancelVerification = ()=>{
    updateDialog(false);
    Confirm(session.uuid, false);
    clearSession();
  }

  // enter function for Confirmer
  const enterVerification = (pPin)=>{
    if(pPin==session.pin){
      Confirm(session.uuid, true);
    } else {
      Confirm(session.uuid, false);
    }
    updateDialog(false);
    clearSession();
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

  const clearSession = () => {
    updateSession({
      uuid: -1,
      latitude: -1,
      longitude: -1,
      pin: -1,
      time: 5,
      tracking: false
    });
  }


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
