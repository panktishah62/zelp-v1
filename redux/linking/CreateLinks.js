import dynamicLinks from '@react-native-firebase/dynamic-links';
import remoteConfig from '@react-native-firebase/remote-config';
import branch from 'react-native-branch';
import RemoteConfigService from '../services/remoteConfigService';

export async function buildLink() {
    const link = await dynamicLinks().buildLink({
        link: 'https://froker.page.link/share',
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: 'https://froker.page.link/share',
        // optional setup which updates Firebase analytics campaign
        // "banner". This also needs setting up before hand
        // analytics: {
        //   campaign: 'banner',
        // },
    });

    return link;
}

export async function buildLinkForShots(shotId) {
    const shotShareTitle =
        RemoteConfigService.getRemoteValue('ShotShareTitle')?.asString();

    const shotsShareMessage =
        RemoteConfigService.getRemoteValue('ShotShareMessage')?.asString();

    const shotsShareImageUrl =
        RemoteConfigService.getRemoteValue('shotsShareImageUrl')?.asString();

    let buo = await branch.createBranchUniversalObject('froker', {
        title: shotShareTitle,
        contentDescription: shotsShareMessage,
        contentImageUrl: shotsShareImageUrl,
    });

    let linkProperties = {
        feature: 'sharing',
        campaign: shotShareTitle,
    };

    let controlParams = {
        custom: shotId,
    };

    let { url } = await buo.generateShortUrl(linkProperties, controlParams);

    return url;
}
