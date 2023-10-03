const config = {
    screens: {
        MainStack: {
            screens: {
                BottomTabNavigation: {
                    path: 'bottomTabNavigation',
                    screens: {
                        Shots: {
                            path: 'shots',
                        },
                    },
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
        'https://froker.live',
    ],
    config,
};

export default linking;
