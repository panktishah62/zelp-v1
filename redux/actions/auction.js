import {
    ADD_LIVESTREAM_DETAILS_POST_STREAM,
    ADD_LIVESTREAM_DETAILS_PRE_STREAM,
    ADD_PAYMENT_DETAILS_SELLER,
    ADD_CATEGORY_FOR_AUCTION,
    ADD_AUCTION_DETAILS,
    ADD_PRODUCT_IMAGES,
    ADD_SELLER_ADDRESS,
    RESET_AUCTION,
    RESET_AUCTION_ERROR,
    SET_PROGRESS_BAR
} from '../constants';

export const addCategory = auctionCategory => {
    return async dispatch => {
        dispatch({ type: ADD_CATEGORY_FOR_AUCTION, payload: auctionCategory });
    };
};

export const addProductImages = productImages => {
    return async dispatch => {
        dispatch({ type: ADD_PRODUCT_IMAGES, payload: productImages });
    };
};

export const addAuctionDetails = auctionDetails => {
    return async dispatch => {
        dispatch({ type: ADD_AUCTION_DETAILS, payload: auctionDetails });
    };
};

export const addPaymentDetailsSeller = paymentDetailsSeller => {
    return async dispatch => {
        dispatch({
            type: ADD_PAYMENT_DETAILS_SELLER,
            payload: paymentDetailsSeller,
        });
    };
};

export const addSellerAddress = sellerAddress => {
    return async dispatch => {
        dispatch({ type: ADD_SELLER_ADDRESS, payload: sellerAddress });
    };
};

export const addLiveStreamDetailsPreStream = livestreamDetails => {
    return async dispatch => {
        dispatch({
            type: ADD_LIVESTREAM_DETAILS_PRE_STREAM,
            payload: livestreamDetails,
        });
    };
};

export const addLiveStreamDetailsPostStream = livestreamDetails => {
    return async dispatch => {
        dispatch({
            type: ADD_LIVESTREAM_DETAILS_POST_STREAM,
            payload: livestreamDetails,
        });
    };
};

export const setProgressBar = progressBar => {
    return async dispatch => {
        dispatch({
            type: SET_PROGRESS_BAR,
            payload: progressBar,
        });
    };
};


export const resetAuction = () => ({
    type: RESET_AUCTION,
});

export const resetAuctionError = () => ({
    type: RESET_AUCTION_ERROR,
});
