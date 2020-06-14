import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { preventAutoHide } from 'expo-splash-screen';

export default function SetupScreen() {
    const [devices, setDevices] = React.useState({ "speaker":0, "watch":0, "sensor":0 });

    // React.useEffect(() => {
    //     console.log("devices", devices);
    // }, String(devices))

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <OptionButton
                    icon="md-musical-notes"
                    label="Connect to a Speaker"
                    onPress={() => {setDevices({...devices, "speaker": 1 })}}
                />

                <OptionButton
                    icon="md-watch"
                    label="Connect to a Smart Watch"
                    onPress={() => {setDevices({...devices, "watch": 1 })}}
                />

                <OptionButton
                    icon="ios-radio"
                    label="Connect to a Sensor"
                    onPress={() => {setDevices({...devices, "sensor": 1 })}}
                    isLastOption
                />
            </ScrollView>
            
            {devices["speaker"]+devices["watch"]+devices["sensor"]? (
                <View style={styles.connectedContainer}>
                    <Text style={styles.connectedHeader}>List of Connected Devices</Text>

                    <View style={styles.connectedOptionContainer}>
                        {devices["speaker"]?
                            <View style={styles.connectedDevices}>
                                <OptionButton
                                    icon="md-musical-notes"
                                    label="XXX Speaker connected"
                                    onPress={() => setDevices({...devices, "speaker": 0 })}
                                    customStyle={styles.connectedOption}
                                    isLastOption
                                />
                            </View> : <View/>}
                        {devices["watch"]?
                            <View style={styles.connectedDevices}>
                                <OptionButton
                                    icon="md-watch"
                                    label="XXX Smart Watch connected"
                                    onPress={() => setDevices({...devices, "watch": 0 })}
                                    customStyle={styles.connectedOption}
                                    isLastOption
                                />
                            </View> : <View/>
                        }
                        {devices["sensor"]?
                            <View style={styles.connectedDevices}>
                                <OptionButton
                                    icon="ios-radio"
                                    label="XXX Sensor connected"
                                    onPress={() => setDevices({...devices, "sensor": 0 })}
                                    customStyle={styles.connectedOption}
                                    isLastOption
                                />
                            </View> : <View/>
                        }
                    </View>
                </View> 
            ) : (                
                <View style={styles.connectedContainer}>
                    <Text style={styles.connectedHeader}>No Devices Connected</Text>
                </View>
            )}
            
        </View>
    );
}

function OptionButton({ icon, label, onPress, isLastOption, customStyle }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption, customStyle]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    optionIconContainer: {
        width: 22,
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
    connectedContainer: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        // marginTop: preventAutoHide,
        // textAlign: 'center',
    },
    connectedHeader: {
        fontSize: 18,
        // color: 'rgba(96,100,109, 1)',
        // color: 'rgba(86,90,98, 1)',
        color: 'rgb(28,28,30)',
        fontWeight: "500",
        textAlign: 'left',
        padding: 15,
        backgroundColor: '#e1e1e1',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#9d9d9d',
    },
    connectedDevices: {
    },
    connectedOptionContainer: {
        backgroundColor: '#e1e1e1',
        paddingTop: 15,
    },
    connectedOption: {
        backgroundColor: '#e1e1e1',
        borderBottomWidth: 0,
        borderColor: '#b4b4b4',
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 15,
    },
});
