import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { AssistanceContext } from '../context/AssistanceContext';
import { Audio } from 'expo-av';
import fileDownload from 'js-file-download';
import * as FileSystem from 'expo-file-system';


export default function LinksScreen() {  
  let {assist, assistDispatch} = React.useContext(AssistanceContext)
  const [ btnVisable, setBtnVisable ] = React.useState(true)
  console.log(assist)

  const _handlePress = () => {
    Linking.openURL( "https://maps.google.com/maps?q=Singapore+".concat(assist.postalCode) );
    // this.props.onPress && this.props.onPress();
  };

  const imageCases=(x) => {
    switch (x) {
      case "medical": return ['../assets/images/nurse(1).png', "Icon made by Freepik from www.flaticon.com"];
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>        
          { 
            assist.type ? (
              <View style={styles.responseContainer}>
                <Text style={styles.textHeader}>{assist.description}</Text>
                <Text style={styles.textAddress} onPress={_handlePress}>{assist.address}</Text>
                { btnVisable ?
                  <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View style={{margin:5, padding:15}}><Button title="Ignore" onPress={()=>{assistDispatch({type:"reset"})}}/></View>
                    <View style={{margin:5, padding:15}}><Button title="Attend" onPress={()=>{setBtnVisable(false)}}/></View>
                  </View> : <View/>
                } 
              </View>) :
            <View/>
          }
      </ScrollView>
      <View>
        <Text style={{textAlign: "center", fontSize: 14, fontWeight:"bold", padding:4}}>Simulation</Text>
        <View style={{margin:5}}><Button title="New Incident" onPress={()=>{
          assistDispatch({type: "medical", address:"BLK 123, ANG MO KIO AVE 4, #05-67"})
          setBtnVisable(true)
        }}></Button></View>
        <View style={{margin:5}} ><Button title="Passive Detection" onPress={()=>{
          Alert.alert(
            'Fall Detected',
            'System has detected that you fell, Do you want to call for assistance?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'Yes', onPress: () => {
                assistDispatch({type: "fall", address:"BLK 123, SENG KANG AVE 4, #05-67"})
                setBtnVisable(true)
              }},
            ],
            { cancelable: false }
          );
        }}></Button></View>
        <View style={{margin:5}} ><Button title="IBM Text to Speech" onPress={()=>{
          getTextToAduio("FALLING")
        }}></Button></View>
      </View>
    </View>
  );
}

const getTextToAduio=(text)=> {
  // Audio.requestPermissionsAsync()
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'audio/wav',
      'Content-Type': 'application/json',
      'Authorization': 'Basic YXBpa2V5OlkyNHdHT0hTS1NiVjRWT1Zoc2FBbXotaFcxY2dURG9HM1FhNHdNRkl1YU01',
    },
    body: JSON.stringify({
      "text": text,
      "voice":"en-US_AllisonV3Voice",
    }),
  };

  const soundObj = new Audio.Sound();
  fetch('https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/d72181b5-0e80-4de5-8256-1a2474b45ead/v1/synthesize', 
    options)
    // .then(response => response.json())
    // .then(responseJson => {
    //   return responseJson.movies;
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    .then(response=> response.text())
    .then(data=> {
      console.log("IBM response",data)
      // fileDownload(data, FileSystem.documentDirectory + "test.wav", 'audio/vnd.wav')

      /** 
       * TODO: Due to limited time and errors, we are unable to save to local devices.
       * Audio are pre downloaded and played.
       */

      soundObj.loadAsync({ uri: require("../audio/fall.wav")}).then(
        soundObj.playAsync().then()
      )
    })

  // FileSystem.downloadAsync(
  //   'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/d72181b5-0e80-4de5-8256-1a2474b45ead/v1/synthesize',
  //   FileSystem.documentDirectory + "test.wav",
  //   options
  // ).then(response=> console.log(response))
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  responseContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textAddress: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  simHeader: {
  }
});
