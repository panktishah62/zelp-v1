import dynamicLinks from '@react-native-firebase/dynamic-links';

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
    const link = await dynamicLinks().buildLink(
        {
            link: `https://froker.page.link/share?shotId=${shotId}`,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://froker.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            // analytics: {
            //   campaign: 'banner',
            // },
            android: {
                packageName: 'com.froker',
            },
            ios: {
                bundleId: 'org.Froker',
                appStoreId: '6450605438',
            },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
    );

    return link;
}

export async function buildLinkForPaymentCallback(paymentId) {
    const link = await dynamicLinks().buildShortLink(
        {
            link: `https://froker.page.link/share?paymentId=${paymentId}`,
            // link: `https://froker.page.link/app`,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://froker.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            // analytics: {
            //   campaign: 'banner',
            // },
            android: {
                packageName: 'com.froker',
                // minimumVersion: '14',
            },
            navigation: {
                forcedRedirectEnabled: true,
            },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
    );

    return link;
}
