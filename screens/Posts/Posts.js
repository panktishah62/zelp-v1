import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import FrokerScreenSaver from '../../assets/icons/FrokerScreenSaver.svg';

const PostScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Your loading code goes here
        // Set isLoading to false when the content is loaded
        setIsLoading(false);
    }, []);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FrokerScreenSaver />
            )}
        </View>
    );
};

export default PostScreen;
