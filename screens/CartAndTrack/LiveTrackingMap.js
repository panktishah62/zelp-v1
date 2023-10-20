/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { colors } from '../../styles/colors';

const LiveTrackingMap = ({ trackingUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    const webViewRef = useRef(null);

    const injectedJavaScript = `
        // Get the element with class "mobile_scrollable-container__Moo58"
        const elementToHide = document.querySelector('.mobile_scrollable-container__Moo58');
    
        // Check if the element exists and hide it
        if (elementToHide) {
            elementToHide.style.display = 'none';
        }
    
        // Return the inner HTML of the entire document
        document.documentElement.innerHTML;
    `;

    const runInjectedJavaScript = () => {
        if (webViewRef.current) {
            setTimeout(() => {
                webViewRef.current.injectJavaScript(injectedJavaScript);
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <View style={styles.spinner}>
                    <ActivityIndicator color={colors.ORANGE} size={32} />
                </View>
            )}
            <WebView
                ref={webViewRef}
                source={{
                    uri: trackingUrl,
                }}
                onLoadEnd={runInjectedJavaScript}
                style={{ flex: 1 }}
                originWhitelist={['*']}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    spinner: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        backgroundColor: colors.WHITE,
    },
});

export default LiveTrackingMap;
