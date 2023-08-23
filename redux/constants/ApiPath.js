export default {
    //SignUp
    signUpUser: '/users/signup',

    //Shots
    shorts: '/froker/shots/getAllShots',
    followFroker: '/froker/followFroker',
    likeShots: '/froker/shots/likeShots',
    unfollowFroker: '/froker/unfollowFroker',
    unlikeShots: '/froker/shots/dislikeShots',
    updateShotsView: '/froker/shots/updateShotsView',
    //Coupons
    getValidCouponsForUser: '/coupon/getValidCouponsForUserUpdated',
    getSearchedCouponForUser: '/coupon/searchCouponUpdated',

    //subscriptionModel
    getSubscriptionModelData: '/subscriptionModel/getSubscriptionModelData',

    //deleteUserAccount
    deleteUserAccount: '/users/deleteUserAccount',

    //Payments
    getPaymentContext: '/payments/getPaymentContext',
    checkPaymentStatus: '/payments/checkPaymentStatus',

    //Orders
    createOrderAndInitiatePayment: '/orders/createOrderAndInitiatePayment',
    createOrderAndInitiateCOD: '/orders/createOrderAndInitiateCOD',
    getAllOrder: 'orders/getUserOrders',
    getOrderDetails: 'orders/getOrderDetails',

    //Refunds
    getAllRefunds: 'refunds/getAllRefunds',

    //Restauranrs
    getAllRestaurants: 'restaurants/getAllRestaurantsWithDistanceTime',

    //get Referral Details
    getUserReferralCodeDetails: 'referral/getUserReferralCodeDetails',
};
