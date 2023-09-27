import dynamicLinks from '@react-native-firebase/dynamic-links';
import remoteConfig from '@react-native-firebase/remote-config';

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
    const BASE_URL_FOR_SHOTS_SHARING = remoteConfig()
        .getValue('baseUrlForShots')
        ?.asString();
    const link = `${BASE_URL_FOR_SHOTS_SHARING}/${shotId}`;

    return link;
}
