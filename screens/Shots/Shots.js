import React, { useEffect, useState, useRef } from 'react';
import {
    FlatList,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import VideoItem from './Shot';
import { getShort } from '../../redux/services/short';
import { dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import { ShotsLoader } from './ShotsLoader';
import { resetFollowedFroker } from '../../redux/actions/froker';
import { useDispatch } from 'react-redux';

const ShotScreen = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [videosData, setVideoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const bottomTabHeight = TAB_BAR_HEIGHT;

    const renderLoader = () => {
        return isLoading ? <ShotsLoader /> : null;
    };

    const loadMoreItem = () => {
        if (currentPage != -1 && !isLoading) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getItemLayout = (data, index) => {
        const ITEM_HEIGHT = dimensions.fullHeight - TAB_BAR_HEIGHT;
        return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
    };

    const fetch = async () => {
        if (!isLoading) {
            setIsLoading(true);
            let response = await getShort({
                // page: currentPage,
                page: 1,
                limit: currentLimit,
            });
            setVideoData([...videosData, ...response?.data?.shots]);
            if (!response?.data?.pagination?.next) {
                setCurrentPage(-1);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        dispatch(resetFollowedFroker());
    }, []);

    useEffect(() => {
        if (currentPage > -1) {
            fetch();
        }
    }, [currentPage]);

    return (
        <FlatList
            data={videosData}
            pagingEnabled
            renderItem={({ item, index }) => (
                <VideoItem
                    data={item}
                    isActive={activeVideoIndex === index}
                    navigation={navigation}
                />
            )}
            onScroll={e => {
                const index = Math.round(
                    e.nativeEvent.contentOffset.y /
                        (dimensions.fullHeight - TAB_BAR_HEIGHT),
                );
                setActiveVideoIndex(index);
            }}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            contentContainerStyle={styles.container}
            removeClippedSubviews={true}
            maxToRenderPerBatch={2}
            // updateCellsBatchingPeriod={10}
            getItemLayout={getItemLayout}
            // windowSize={4}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BLACK,
    },
});

export default ShotScreen;
