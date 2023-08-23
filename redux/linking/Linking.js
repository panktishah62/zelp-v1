const config = {
    screens: {
        MainStack: {
            screens: {
                BottomTabNavigation: {
                    path: 'bottomTabNavigation',
                },
                LogIn: {
                    path: 'logIn',
                },
            },
        },
        AppTour: {
            path: 'appTour',
        },
    },
};

const linking = {
    prefixes: [
        'froker://',
        'froker://app',
        'myapp://',
        'https://froker.page.link/share',
        'https://frokerprachi.app.link',
        'https://froker-portal.de',
        'https://www.froker.in',
    ],
    config,
};

export default linking;
