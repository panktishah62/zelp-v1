import {
    EMPTY_SEARCH,
    FETCH_DATA_FAILURE_SEARCH,
    RESET_SEARCH,
    SEARCH_FOODITEM,
    SEARCH_RESTAURANT,
    SEARCH_RESTAURANT_AND_FOODITEMS,
} from '../constants';

const initialState = {
    searchRestaurants: [],
    searchFoodItems: [],
    searchRestaurantsAndFoodItems: [],
    error: '',
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESTAURANT:
            return {
                ...state,
                searchRestaurants: action.payload,
                error: '',
            };
        case SEARCH_FOODITEM:
            return {
                ...state,
                searchFoodItems: action.payload,
                error: '',
            };
        case SEARCH_RESTAURANT_AND_FOODITEMS:
            return {
                ...state,
                searchRestaurantsAndFoodItems: action.payload,
                error: '',
            };
        case EMPTY_SEARCH:
            return {
                ...state,
                searchRestaurants: [],
                searchFoodItems: [],
                error: '',
            };
        case RESET_SEARCH:
            return {
                ...initialState,
            };
        case FETCH_DATA_FAILURE_SEARCH:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
