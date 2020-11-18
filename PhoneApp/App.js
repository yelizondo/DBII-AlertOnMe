import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';
import Header from './components/Header'
import Button from './components/Button'
import Selector from './components/Selector';
import Input from './components/Input';
import getCanton from './api_comms/Locate'
import sendReport from './api_comms/Report'

export default function App() {
  const [session, updateSession] = useState({
    uuid: -1,
    latitude: -1,
    longitude: -1,
    pin: -1,
    time: 5
  });

  const setPin = pPin =>{
    console.log(pPin);

    updateSession({
      uuid: session.uuid,
      latitude: session.latitude,
      longitude: session.longitude,
      pin: pPin,
      time: session.time
    })
  }

  const setTime = pTime =>{
    console.log(pTime);
    // session.pin = param
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
    let lat = "9.949556"
    let long = "-84.046887"
    getCanton(lat, long)
    .then(res => {
      let canton = res.data.results[0].address_components[0].long_name
      //console.log(canton)
      session.uuid = uuid.v4(),
      console.log(session)

      sendReport(session.uuid, lat, long, canton)
    })
  };
  
  return (
  <View style={styles.container}>
    <Header title='Alert On Me!' />
    <Selector prompt='For how long will you like to be tracked?' action={setTime}/>
    <Input placeholder="Insert a 3 digit pin" changer={setPin}/>
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
