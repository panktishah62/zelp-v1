import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    FlatList,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    RefreshControl,
    AppState,
} from 'react-native';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import { getShort } from '../../redux/services/short';
import { dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import { ShotsLoader } from './ShotsLoader';
import { resetFollowedFroker } from '../../redux/actions/froker';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import VideoItem from './Shot';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import { handleShotsLinkInShots } from '../../redux/linking/HandleLinks';
import { dynamicSize } from '../../utils/responsive';
import { getUserProfile } from '../../redux/actions/user';

const ShotClassScreen = props => {
    const { route, navigation } = props;
    const { shotsId } = route && route.params ? route.params : {};
    const [shotId, setShotId] = useState(shotsId ? shotsId : undefined);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(
        appState.current === 'active',
    );
    const location = useSelector(state => state.address.location);
    const dispatch = useDispatch();
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [videosData, setVideoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    // const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [refreshingLogin, setRefreshingLogin] = useState(false);

    const windowDimensions = Dimensions.get('window');
    const windowHeight = windowDimensions.height;
    const insets = useSafeAreaInsets();
    const screenHeight = windowHeight - insets.bottom;

    const {
        isLoading,
        data,
        hasNextPage,
        isFetching,
        fetchNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['shots'],
        queryFn: async currPage => {
            let data = {};
            if (shotId) {
                data = await getShort({
                    page: currentPage,
                    limit: currentLimit,
                    shotId: shotId,
                });
            } else {
                data = await getShort({
                    page: currentPage,
                    limit: currentLimit,
                });
            }
            setRefreshing(false);
            setRefreshingLogin(false);
            return data;
        },
        getNextPageParam: (_lastPage, allPages) => {
            let hasNextPage = false;
            if (_lastPage?.data?.pagination?.next) {
                hasNextPage = true;
                // setCurrentPage(currentPage + 1);
            }
            return hasNextPage;
        },
        onSuccess: fetchedData => {
            setVideoData(fetchedData.pages.map(page => page.data.shots).flat());
            setRefreshing(false);
            setRefreshingLogin(false);
            setCurrentPage(currentPage + 1);
        },
    });

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const renderLoader = () => {
        // return <ShotsLoader />;
        return <ActivityIndicator size="large" color={colors.ORANGE} />;
    };

    const getItemLayout = (data, index) => {
        const ITEM_HEIGHT = screenHeight;
        return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
    };

    useEffect(() => {
        dispatch(resetFollowedFroker());
    }, []);

    const isScreenFocused = useIsFocused();
    useEffect(() => {
        setIsFocused(isScreenFocused);
        dispatch(getUserProfile());
    }, [isScreenFocused]);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            nextAppState => {
                appState.current = nextAppState;
                setAppStateVisible(appState.current === 'active');
            },
        );

        return () => {
            subscription.remove();
        };
    }, []);

    const onRefresh = () => {
        setCurrentPage(1);
        setActiveVideoIndex(0);
        setRefreshing(true);
        setVideoData([]);
        const timeoutId = setTimeout(() => {
            refetch();
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const onRefreshLogin = () => {
        setCurrentPage(1);
        setActiveVideoIndex(0);
        setRefreshingLogin(true);
        setVideoData([]);
        const timeoutId = setTimeout(() => {
            // refetch();
            loadMore();
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isLoggedIn = async () => {
        onRefreshLogin();
    };
    useEffect(() => {
        isLoggedIn();
    }, [isAuthenticated, location?.latitude]);

    const onViewRef = useRef(({ viewableItems }) => {
        viewableItems.forEach(item => {
            // if (
            //     item.index !== 0 &&
            //     (item.index % 2 === 0 || item.index % 5 === 0)
            // ) {
            //     // console.log(item.index);
            //     setCurrentPage(item.index);
            // }
            // if (
            //     item.index !== 0 &&
            //     item.index % 2 === 0 &&
            //     item.index % 5 !== 0
            // ) {
            //     loadMore();
            // }
            // if (
            //     item.index > 0 &&
            //     item.index + 2 == currentLimit * currentPage
            // ) {
            //     loadMore();
            // }
            setActiveVideoIndex(item.index);
        });
    });

    const _viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 75,
    });

    const handleDynamicLink = link => {
        if (link && link.url) {
            // handleShotsLinkInShots(link, setShotId, onRefreshLogin);
            if (link.url.includes('shotId')) {
                handleShotsLinkInShots(link, setShotId, onRefreshLogin);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (link && link.url) {
                    // handleShotsLinkInShots(link, setShotId, onRefreshLogin);
                    if (link.url.includes('shotId')) {
                        handleShotsLinkInShots(link, setShotId, onRefreshLogin);
                    }
                }
            });
    }, []);

    return (
        <View>
            {!(isLoading || refreshingLogin || refreshing) ? (
                <FlatList
                    // data={data?.pages.map(page => page.data.shots).flat()}
                    snapToAlignment="start"
                    snapToInterval={screenHeight}
                    data={videosData}
                    pagingEnabled={true}
                    onMomentumScrollBegin={() => {
                        this.onEndReachedCalledDuringMomentum = false;
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <VideoItem
                                data={item}
                                isActive={activeVideoIndex === index}
                                navigation={navigation}
                                isFocused={isFocused}
                                appStateVisible={appStateVisible}
                            />
                        );
                    }}
                    // onScroll={e => {
                    //     const index = Math.round(
                    //         e.nativeEvent.contentOffset.y /
                    //             (screenHeight - TAB_BAR_HEIGHT),
                    //     );
                    //     setActiveVideoIndex(index);
                    // }}
                    ListFooterComponent={
                        isFetchingNextPage ? renderLoader : null
                    }
                    onEndReached={loadMore}
                    contentContainerStyle={styles.container}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    // updateCellsBatchingPeriod={10}
                    getItemLayout={getItemLayout}
                    // windowSize={4}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                        />
                    }
                    // snapToInterval={screenHeight - TAB_BAR_HEIGHT}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={_viewabilityConfig.current}
                    decelerationRate={'fast'}
                    disableIntervalMomentum={true}
                />
            ) : (
                // <ShotsLoader />
                <ActivityIndicator
                    size="large"
                    color={colors.ORANGE}
                    style={styles.loaderStyle}
                />
            )}
            {/* {videosData.length <= 0 && <ShotsLoader />} */}
            {/* {videosData.length <= 0 && (
                <ActivityIndicator
                    size="large"
                    color={colors.ORANGE}
                    style={styles.loaderStyle}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BLACK,
    },
    loaderStyle: {
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: dimensions.fullWidth,
        resizeMode: 'cover',
        backgroundColor: colors.BLACK,
    },
});

export default ShotClassScreen;
