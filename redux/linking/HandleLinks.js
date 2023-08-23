export const handleShotsLinkInBottomTabNavigator = (link, navigation) => {
    const shotsId = link.url.split('=').pop();
    navigation.navigate('Shots', { shotsId: shotsId });
};

export const handleShotsLinkInShots = (link, setShotId, fun) => {
    const shotsId = link.url.split('=').pop();
    setShotId(shotsId);
    fun();
};

export const handlePaymentCallBack = (link, navigation) => {
    const merchantTransactionId = link.url.split('=').pop();
    navigation.navigate('Payments', {
        merchantTransactionId: merchantTransactionId,
    });
};

export const handleShotsLinkInMainStack = (link, navigation) => {};
