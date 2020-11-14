import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  // const [count, setCount] = useState(0);
  const [id, getId] = useState('');
  // const onPress = () => setCount(prevCount => {
  //   console.log("sirve");
  //   return prevCount + 1;
  // });
  const onPress = () => getId(prevCount => uuid.v4() );

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style = {{fontSize: 50, color: 'white'}} >Alert On Me!</Text> 
        <Text style={styles.text}>Camine tranquilo papillo</Text>
        <Text style={styles.text}>ID: {id}</Text>
        {/* <Text style={styles.text}>Count: {count}</Text> */}
      </View> 
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.text}>Follow me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 100,
    backgroundColor: '#2d3deb'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#30334d",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 30,
    color: 'white'
  }
});
