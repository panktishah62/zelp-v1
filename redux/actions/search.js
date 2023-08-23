import {
    SEARCH_RESTAURANT,
    SEARCH_FOODITEM,
    BASE_URL,
    EMPTY_SEARCH,
    SEARCH_RESTAURANT_AND_FOODITEMS,
    RESET_SEARCH,
    NETWORK_ERROR,
    UNEXPECTED_ERROR,
    FETCH_DATA_FAILURE_SEARCH,
} from '../constants';

export const searchRestaurants = (query, latitude, longitude, setIsLoading) => {
    return async dispatch => {
        try {
            // perform search for food items with the given query
            const results = await fetch(
                `${BASE_URL}/restaurants/searchRestaurant/${query}/${latitude}/${longitude}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            )
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success' && data.restaurants.length) {
                        setIsLoading(false);
                        // dispatch action to update store with search results
                        dispatch({
                            type: SEARCH_RESTAURANT,
                            payload: data.restaurants,
                        });
                    } else {
                        if (query.length == 0 || query.length > 6) {
                            setIsLoading(false);
                        }
                        dispatch({
                            type: SEARCH_RESTAURANT,
                            payload: [],
                        });
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    dispatch({
                        type: SEARCH_RESTAURANT,
                        payload: [],
                    });
                });
        } catch (error) {
            console.error(error);
        }
    };
};

export const searchFoodItems = (query, latitude, longitude, setIsLoading) => {
    return async dispatch => {
        try {
            // perform search for food items with the given query
            const results = await fetch(
                `${BASE_URL}/restaurants/searchFoodItemByRestaurantsWithDistanceTiming/${query}/${latitude}/${longitude}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            )
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success' && data.restaurants.length) {
                        setIsLoading(false);
                        // dispatch action to update store with search results
                        dispatch({
                            type: SEARCH_FOODITEM,
                            payload: data.restaurants,
                        });
                    } else {
                        if (query.length == 0 || query.length > 6) {
                            setIsLoading(false);
                        }
                        // dispatch action to update store with search results
                        dispatch({
                            type: SEARCH_FOODITEM,
                            payload: [],
                        });
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    dispatch({
                        type: SEARCH_FOODITEM,
                        payload: [],
                    });
                });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
};

export const emptySearch = () => {
    return async dispatch => {
        dispatch({
            type: EMPTY_SEARCH,
        });
    };
};

export const searchRestaurantAndFoodItems = (
    query,
    setIsLoading,
    setIsFound,
) => {
    return async dispatch => {
        try {
            // perform search for food items with the given query
            const results = await fetch(
                `${BASE_URL}/restaurants/searchRestaurantAndFoodItem/${query}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            )
                .then(response => {
                    if (!response.ok) {
                        throw new Error(NETWORK_ERROR);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success') {
                        setIsLoading(false);
                        if (data.results.length == 0) {
                            setIsFound(false);
                        }
                        // dispatch action to update store with search results
                        dispatch({
                            type: SEARCH_RESTAURANT_AND_FOODITEMS,
                            payload: data.results,
                        });
                    } else {
                        // if (query.length == 0 || query.length > 6) {
                        //   setIsLoading(false);
                        // }
                        setIsLoading(false);
                        setIsFound(false);
                        throw new Error(
                            data.message ? data.message : UNEXPECTED_ERROR,
                        );
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    setIsFound(false);
                    dispatch({
                        type: FETCH_DATA_FAILURE_SEARCH,
                        payload: error,
                    });
                });
        } catch (error) {
            setIsLoading(false);
            setIsFound(false);
            dispatch({ type: FETCH_DATA_FAILURE_SEARCH, payload: error });
        }
    };
};

export const resetSearch = () => ({
    type: RESET_SEARCH,
});
