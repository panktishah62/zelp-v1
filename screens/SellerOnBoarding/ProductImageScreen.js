import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
import { useDispatch, useSelector } from 'react-redux';
import { addProductImages } from '../../redux/actions/auction';
import { Image } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';

const ProductImageScreen = props => {
    const select = useSelector(state => state.auction);
    const { navigation, route } = props;
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView stickyHeaderIndices={[2]}>
                    <View styles={styles.mainCon}>
                        <Text style={styles.heading}>
                            Show us what you'll sell!
                        </Text>
                        <Text style={styles.heading2}>
                            For fastest reach, add 1-3 photos or videos of items
                            you'd want to sell.
                        </Text>

                        <View style={styles.imageUploadContainer}>
                            <Text>{select.category}</Text>
                            <PhotoUpload
                                onPhotoSelect={avatar => {
                                    if (avatar) {
                                        console.log(
                                            'Image base64 string: ',
                                            avatar,
                                        );
                                    }
                                }}>
                                <Image
                                    style={{
                                        paddingVertical: 30,
                                        width: 150,
                                        height: 150,
                                        borderRadius: 75,
                                    }}
                                    resizeMode="cover"
                                    source={{
                                        uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg',
                                    }}
                                />
                            </PhotoUpload>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Next'}
                        pressHandler={() => {
                            dispatch(addProductImages([]));
                            navigation.navigate('AuctionDetails');
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    mainCon: {
        marginLeft: 30,
    },
    safeAreaContainer: {
        flex: 1,
        // backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },

    heading: {
        ...fonts.NUNITO_800_28,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(20),
        marginBottom: dynamicSize(30),
    },
    heading2: {
        ...fonts.NUNITO_500_16,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    imageUploadContainer: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingLeft: dynamicSize(10),
        paddingRight: dynamicSize(10),
    },
    stickyContainer: {
        flex: 1,
        height: 100,
        backgroundColor: colors.WHITE,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});

export default ProductImageScreen;
