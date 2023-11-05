import remoteConfig from '@react-native-firebase/remote-config';

const RemoteConfigService = {
    initialize: async () => {
        await remoteConfig().setConfigSettings({
            minimumFetchIntervalMillis: 300,
        });
        await remoteConfig().fetchAndActivate();
    },
    getRemoteValue: key => remoteConfig().getValue(key),
};

export default RemoteConfigService;
