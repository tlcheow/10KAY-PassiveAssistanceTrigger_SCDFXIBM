import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AssistanceContext } from "../context/AssistanceContext.js"

export default function HomeScreen() {
  let {assist, assistDispatch} = React.useContext(AssistanceContext)
  // console.log(assist)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.grid}>
          <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.clickable} onPress={()=> {
                assistDispatch({type: "breathing"})
                console.log("breathing difficulties pressed")
              }} >
                <Image
                  source={require('../assets/images/patient.png')}
                  alt="Icon made by Freepik from www.flaticon.com"
                  style={styles.assistImage}
                />
                <Text style={styles.assistText}>Breathing Difficulties</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.clickable} onPress={()=> {
                assistDispatch({type: "fall"})
                console.log("fall pressed")
              }} >
              <Image
                source={require('../assets/images/fall(1).png')}
                alt="Icon made by pongsakornRed from www.flaticon.com"
                style={styles.assistImage}
              />
              <Text style={styles.assistText}>Fall</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.clickable} onPress={()=> {
                assistDispatch({type: "bleeding"})
                console.log("bleeding pressed")
              }} >
              <Image
                source={require('../assets/images/injury.png')}
                alt="Icon made by Freepik from www.flaticon.com"
                style={styles.assistImage}
              />
              <Text>Bleeding</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.clickable} onPress={()=> {
                assistDispatch({type: "cardiac"})
                console.log("cardiac issue pressed")
              }} >
              <Image
                source={require('../assets/images/heart.png')}
                alt="Icon made by smalllikeart from www.flaticon.com"
                style={styles.assistImage}
              />
              <Text>Cardiac Issue</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.clickable} onPress={()=> {
                assistDispatch({type: "technical"})
                console.log("technical assistance pressed")
              }} >
              <Image
                source={require('../assets/images/technical-support(1).png')}
                alt="Icon made by Freepik from www.flaticon.com"
                style={styles.assistImage}
              />
              <Text>Technical Assistance</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.clickable} onPress={()=> {
                assistDispatch({type: "medical"})
                console.log("medical pressed")
              }} >
              <Image
                source={require('../assets/images/nurse(1).png')}
                alt="Icon made by Freepik from www.flaticon.com"
                style={styles.assistImage}
              />
              <Text>Medical Assistance</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 130,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  assistImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    alignItems: "center",
    marginTop: 3,
    // paddingHorizontal:preventAutoHide
  },
  assistText:{
    fontSize: 14,
    // paddingHorizontal:preventAutoHide
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 15,
  },
  clickable: {
    alignItems: "center",
    justifyContent: "center",
    textAlign:"center",
  }
});
