/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Linking,
  Platform,
  StatusBar,
  StyleSheet,

  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import RootStack from './navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Root, Toast } from 'react-native-popup-confirm-toast';
import { QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import linking from './redux/linking/Linking';
import { ErrorHandler } from './components/ErrorHandler/ErrorHandler';
import { colors, theme } from './styles/colors';
import ForegroundHandler from './utils/ForegroundHandler';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import { createChannel, requestUserPermission } from './utils/pushnotification_helper';
import remoteConfig from '@react-native-firebase/remote-config';
import { convertedVersionToNumber } from './utils';
import { PaperProvider } from 'react-native-paper';
import AppUpdateScreen from './screens/AppUpdateScreen';
import { toastConfig } from './utils/config';
import { queryClient } from './utils/queryClient';

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
      const getUrlAsync = async () => {
          // Get the deep link used to open the app
          const initialUrl = await Linking.getInitialURL();

          // The setTimeout is just for testing purpose
          setTimeout(() => {
              setUrl(initialUrl);
              setProcessing(false);
          }, 1000);
      };

      getUrlAsync();
  }, []);

  return { url, processing };
};

function App(): JSX.Element {

  let appVersion = DeviceInfo.getVersion();
    const [isStableVersion, setIsStableVersion] = useState(true);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const { url: initialUrl, processing } = useInitialURL();

    useEffect(() => {
        const unsubscribe = Linking.addEventListener('url', event => {
            Linking.canOpenURL(event.url).then(supported => {
                if (supported) {
                }
            });
        });

        return () => {
            Linking.removeAllListeners('url');
        };
    }, []);

    useEffect(() => {
        createChannel();
        requestUserPermission();
    }, []);

    useEffect(() => {
        remoteConfig()
            .setDefaults({})
            .then(() => remoteConfig().fetch(0))
            .then(() => remoteConfig().fetchAndActivate())
            .then(fetchedRemotely => {
                if (Platform.OS == 'android') {
                    const stableAppVersion = remoteConfig().getValue(
                        'stableAppVersionAndroid',
                    );
                    if (
                        stableAppVersion &&
                        appVersion &&
                        convertedVersionToNumber(String(appVersion)) <
                            convertedVersionToNumber(
                                String(stableAppVersion.asString()),
                            )
                    ) {
                        setIsStableVersion(false);
                    }
                } else {
                    const stableAppVersion = remoteConfig().getValue(
                        'stableAppVersionIOS',
                    );
                    if (
                        stableAppVersion &&
                        appVersion &&
                        convertedVersionToNumber(String(appVersion)) <
                            convertedVersionToNumber(
                                String(stableAppVersion.asString()),
                            )
                    ) {
                        setIsStableVersion(false);
                    }
                }
            });
    }, []);

  return (
    <Provider store={store}>
      <Root>
            <QueryClientProvider client={queryClient}>
                <PersistGate loading={null} persistor={persistor}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <StatusBar hidden />
                        <NavigationContainer linking={linking}>
                            <ErrorHandler>
                                <SafeAreaProvider>
                                    <SafeAreaView
                                        style={{
                                            flex: 1,
                                            backgroundColor:
                                                colors.WHITE,
                                        }}
                                        edges={['bottom']}>
                                        <ForegroundHandler/>
                                        {isStableVersion ? (
                                            <PaperProvider
                                                theme={theme}>
                                                <RootStack />
                                            </PaperProvider>
                                        ) : (
                                            <AppUpdateScreen />
                                        )}
                                        <Toast config={toastConfig} />
                                    </SafeAreaView>
                                </SafeAreaProvider>
                            </ErrorHandler>
                        </NavigationContainer>
                    </GestureHandlerRootView>
                </PersistGate>
            </QueryClientProvider>
    </Root>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
