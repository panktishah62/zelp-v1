export default {
    //SignUp
    signUpUser: 'users/signup',
    signInUser: 'users/signin',
    verifyOTP: 'users/verify',
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

    //Shots
    shorts: 'froker/shots/getAllShots',
    followFroker: 'froker/followFroker',
    likeShots: 'froker/shots/likeShots',
    unfollowFroker: 'froker/unfollowFroker',
    unlikeShots: 'froker/shots/dislikeShots',
    updateShotsView: 'froker/shots/updateShotsView',
    //Coupons
    getValidCouponsForUser: 'coupon/getValidCouponsForUserUpdated',
    getSearchedCouponForUser: 'coupon/searchCouponUpdated',

    //subscriptionModel
    getSubscriptionModelData: 'subscriptionModel/getSubscriptionModelData',

    //deleteUserAccount
    deleteUserAccount: 'users/deleteUserAccount',

    //Payments
    getPaymentContext: 'payments/getPaymentContext',
    checkPaymentStatus: 'payments/checkPaymentStatus',
    getPaymentDetails: 'payments/getPaymentDetails',

    //Orders
    createOrderAndInitiatePayment: 'orders/createOrderAndInitiatePayment',
    createOrderAndInitiateCOD: 'orders/createOrderAndInitiateCOD',
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
    getSubscriptionPlanDetails:'subscriptionPlan/showSubscriptionPlans',
    getBannerImages:'subscriptionPlan/getBannerImages',
    getPartnerRestaurants:'subscriptionPlan/getPartnerRestaurants',
    showOneSubscriptionPlan:'subscriptionPlan/showSubscriptionPlanDetails',
    showComboForSubscription:`subscriptionPlan/getCombosForSubscriptionPlan`,
    getBestSellerFoodItems:`subscriptionPlan/getBestSellingFoodItems`,,
    getCategorizedFoodItems:'subscriptionPlan/getCategorizedFoodItems'

};
