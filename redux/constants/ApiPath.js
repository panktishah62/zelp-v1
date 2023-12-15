export default {
    //SignUp
    signUpUser: 'users/signup',
    signInUser: 'users/signin',
    verifyOTP: 'users/verifyUpdated',
    resendOTP: 'users/verify',

    //address
    addUserAddress: 'address/userAddress',
    editUserAddress: 'address/userAddress',
    getAllUserAddress: 'address/userAddresses',
    setDefaultAddress: 'address/userAddress/setDefault',
    getDefaultAddress: 'address/defaultUserAddress',
    deleteUserAddress: 'address/userAddress',

    //user
    editUserProfile: 'users/updateProfile',
    getUserProfile: 'users/userProfile',
    updateUserToken: 'users/updateUserToken',
    getUserWallet: 'users/getUserWallet',

    //Shots
    shorts: 'froker/shots/getAllShotsUpdated',
    followFroker: 'froker/followFroker',
    likeShots: 'froker/shots/likeShots',
    unfollowFroker: 'froker/unfollowFroker',
    unlikeShots: 'froker/shots/dislikeShots',
    updateShotsView: 'froker/shots/updateShotsView',
    getShotsViewRestSortingConfig: 'froker/shots/getShotsViewRestSortingConfig',

    //Coupons
    getValidCouponsForUser: 'coupon/getValidCouponsForUserUpdated',
    getSearchedCouponForUser: 'coupon/searchCouponUpdated',
    getSubscriptionCouponsForUser: 'coupon/getSubscriptionCouponsForUser',
    getSearchedSubscriptionCouponForUser: 'coupon/searchSubscriptionCoupons',

    //subscriptionModel
    getSubscriptionModelData: 'subscriptionModel/getSubscriptionModelData',

    //deleteUserAccount
    deleteUserAccount: 'users/deleteUserAccount',

    //Payments
    getPaymentContext: 'payments/getPaymentContext',
    checkPaymentStatus: 'payments/checkPaymentStatus',
    getPaymentDetails: 'payments/getPaymentDetails',

    //Orders
    createOrderAndInitiatePayment:
        'orders/createOrderAndInitiatePaymentUpdated',
    createOrderAndInitiateCOD: 'orders/createOrderAndInitiateCODUpdated',
    getAllOrder: 'orders/getUserOrders',
    getOrderDetails: 'orders/getOrderDetails',
    getCurrentUserOrder: 'orders/currentOrder',
    cancelOrderByUser: 'orders/cancelOrderByUser',

    //Refunds
    getAllRefunds: 'refunds/getAllRefunds',

    //Restauranrs
    getAllRestaurants: 'restaurants/getAllRestaurantsWithDistanceTime',
    getTopRatedRestaurants: 'restaurants/getTopRatedRestaurants',
    getOffersRestaurants: 'restaurants/getOffersRestaurants',
    getAllCategorisedRestaurants:
        'restaurants/searchFoodItemByRestaurantsWithDistanceTiming',
    searchRestaurants: 'restaurants/searchRestaurant',
    searchFoodItemByRestaurants:
        'restaurants/searchFoodItemByRestaurantsWithDistanceTiming',
    //foodItems
    getAllFoodItems: 'foodItems/getFoodItems',

    //get Referral Details
    getUserReferralCodeDetails: 'referral/getUserReferralCodeDetails',

    //Subscription
    getSubscriptionPlanDetails: 'subscriptionPlan/showSubscriptionPlans',
    getBannerImages: 'subscriptionPlan/getBannerImages',
    getPartnerRestaurants: 'subscriptionPlan/getPartnerRestaurants',
    showOneSubscriptionPlan: 'subscriptionPlan/showSubscriptionPlanDetails',
    showComboForSubscription: 'subscriptionPlan/getCombosForSubscriptionPlan',
    getBestSellerFoodItems: 'subscriptionPlan/getBestSellingFoodItems',
    getQuickCheckoutItems: 'subscriptionPlan/getQuickCheckoutItems',
    getCategorizedFoodItems: 'subscriptionPlan/getCategorizedFoodItems',
    subscribeToAPlan: 'subscriptionPlan/subscribeToAPlan',
    showSubscriptionDetails: 'subscriptionPlan/showSubscriptionDetails',
    getOneSubscriptionOrder: 'subscriptionPlan/getOneSubscriptionOrder',
    getMealPlansForSubscription:
        'subscriptionPlan/getMealPlansForSubscriptionPlan',
    orderUsingSubscription: 'subscriptionPlan/orderUsingSubscription',
    getSubscriptionConfig: 'subscriptionPlan/getSubscriptionConfig',
    getOrderHistory: 'subscriptionPlan/getOrderHistory',
};
