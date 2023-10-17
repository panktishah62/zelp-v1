/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useCallback } from 'react';
import { WebView } from 'react-native-webview';

const LiveTrackingMap = ({ isLoading }) => {
    const TRACKING_URL =
        'https://porter.in/track_live_order?booking_id=CRN1807306740&customer_uuid=d65fe75e-64f5-4ccb-b6f9-b6f59a96227b';

    const webViewRef = useRef(null);
    useEffect(() => {
        runInjectedJavaScript();
    }, [isLoading, runInjectedJavaScript]);

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

    const runInjectedJavaScript = useCallback(() => {
        if (webViewRef.current) {
            setTimeout(
                () => webViewRef.current.injectJavaScript(injectedJavaScript),
                1000,
            );
        }
    }, [injectedJavaScript]);

    return (
        <WebView
            ref={webViewRef}
            source={{
                uri: TRACKING_URL,
            }}
            onLoadEnd={runInjectedJavaScript}
            style={{ flex: 1 }}
            originWhitelist={['*']}
        />
    );
};

export default LiveTrackingMap;
