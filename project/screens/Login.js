import * as React from 'react';
import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// import WebAppStrategy from 'ibmcloud-appid'
import AppID from 'ibmcloud-appid-js';
import  { appConfig }  from '../apiid.config'

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
    native: 'your.app://redirect',
    useProxy,
});

export default function Login() {

    const [loginRequest, setLoginRequest] = React.useState();

    const appID = new AppID();

    React.useEffect(()=>{
        appID.init({clientId: appConfig.clientId, discoveryEndpoint: appConfig.discoveryEndpoint})
        .then(result => {
            console.log("result",result);
            setLoginRequest(result);
        })
    })


    const onLoginButtonClick= () => {
        try {
            // const tokens = await 
            
            appID.signin().then(tokens => 
                console.log(tokens)
            )
            // let userInfo = await appID.getUserInfo(tokens.accessToken);

            // hideElement($welcome);
            // showElement($afterLogin);

            // let decodeIDToken = tokens.idTokenPayload;

            // $welcomeNameId.textContent = 'Hi ' + decodeIDToken.name + ', Congratulations!';
            // $tokenContent.textContent = JSON.stringify(decodeIDToken);
            // $userContent.textContent = JSON.stringify(userInfo);
        } catch (e) {
            $error.textContent = e;
            showElement($loginButton);
        }
    }

    // const discovery = AuthSession.useAutoDiscovery(appConfig.discoveryEndpoint);

    // Create and load an auth request
    // const [request, result, promptAsync] = AuthSession.useAuthRequest(
    //     {
    //         ...appid,
    //         redirectUri,
    //         // scopes: ['openid', 'profile', 'email', 'offline_access'],
    //     },
    //     discovery
    // );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button id='login' title="Login!" disabled={loginRequest} onPress={onLoginButtonClick} />
            {/* {result && <Text>{JSON.stringify(result, null, 2)}</Text>} */}
        </View>
    );
}