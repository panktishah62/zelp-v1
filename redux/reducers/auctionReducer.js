import { SCREEN_PROGRESS_CONSTANT } from '../../utils';
import {
    ADD_CATEGORY_FOR_AUCTION,
    ADD_PRODUCT_IMAGES,
    ADD_AUCTION_DETAILS,
    ADD_PAYMENT_DETAILS_SELLER,
    ADD_SELLER_ADDRESS,
    ADD_LIVESTREAM_DETAILS_PRE_STREAM,
    ADD_LIVESTREAM_DETAILS_POST_STREAM,
    RESET_AUCTION,
    RESET_AUCTION_ERROR,
    SET_PROGRESS_BAR
} from '../constants';

const initialState = {
    category: '',
    productImages: [],
    thumbnail: null,
    auctionTitle: '',
    auctionDescription: '',
    paymentDetails: null,
    sellerAddress: null,
    userID: '',
    liveID: '',
    startTime: '',
    endTime: '',
    status: 'NOT_STARTED',
    productAuctionedDetails: {},
    peakHeadcount: 0,
    progressBar: SCREEN_PROGRESS_CONSTANT,
};

const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY_FOR_AUCTION:
            return {
                ...state,
                category: action.payload,
                error: '',
            };
        case ADD_PRODUCT_IMAGES:
            return {
                ...state,
                productImages: action.payload,
                error: '',
            };
        case ADD_AUCTION_DETAILS:
            return {
                ...state,
                thumbnail: action.payload.thumbnail,
                auctionTitle: action.payload.auctionTitle,
                auctionDescription: action.payload.auctionDescription,
                error: '',
            };
        case ADD_PAYMENT_DETAILS_SELLER:
            return {
                ...state,
                paymentDetails: action.payload,
                error: '',
            };
        case ADD_SELLER_ADDRESS:
            return {
                ...state,
                sellerAddress: action.payload,
                error: '',
            };
        case ADD_LIVESTREAM_DETAILS_PRE_STREAM:
            return {
                ...state,
                userID: action.payload.userID,
                liveID: action.payload.liveID,
                startTime: action.payload.startTime,
                status: action.payload.status,
                error: '',
            };
        case ADD_LIVESTREAM_DETAILS_POST_STREAM:
            return {
                ...state,
                userID: action.payload.userID,
                liveID: action.payload.liveID,
                endTime: action.payload.endTime,
                status: action.payload.status,
                productAuctionedDetails: action.payload.productAuctionedDetails,
                peakHeadcount: action.payload.peakHeadcount,
                error: '',
            };
        case RESET_AUCTION:
            return {
                ...initialState,
            };
        case SET_PROGRESS_BAR:
            return {
                ...state,
                progressBar: action.payload,
                error: '',
            };
        case RESET_AUCTION_ERROR:
            return {
                ...state,
                error: '',
            };
        default:
            return state;
    }
};

export default auctionReducer;
