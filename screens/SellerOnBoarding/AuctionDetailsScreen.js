import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import EmptyProfileIcon from '../../assets/icons/emptyProfile.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import TextInput_ from '../../components/Inputs/TextInput';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { DialogTypes, emailRegex } from '../../utils';
import { showDialog } from '../../redux/actions/dialog';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';

const genders = ['Male', 'Female', 'Others'];

const getDefaultValueForSelect = genderPrevious => {
    let selectedIndex = -1;
    genders.forEach((gender, index) => {
        if (genderPrevious === gender) {
            selectedIndex = index;
        }
    });
    return selectedIndex;
};

const AuctionDetailsScreen = props => {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    // const userData = route.params;

    const getFormattedDate = timestamp => {
        const dateObj = new Date(timestamp);
        const formattedDate = format(dateObj, 'dd/MM/yyyy');
        return formattedDate;
    };

    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        dob: new Date(),
        gender: '',
        phoneNo: '',
    });

    const [focus, setFocus] = useState(0);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const setBlur = () => {
        setFocus(0);
    };

    const handleSubmit = () => {
        const dataToPost = {
            email: userDetails?.email,
            dateOfBirth: userDetails?.dob,
            gender: userDetails?.gender,
        };
        if (!userDetails.email) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Email',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!emailRegex.test(email)) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter a Valid Email',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!userDetails.dob) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Date of Birth',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!userDetails.gender) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Gender',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            // dispatch(editUserProfile(dataToPost, navigation));
        }
    };

    const onChange = (event, selectedDate) => {
        setShow(false);
        setDate(new Date(selectedDate));
        setUserDetails({
            ...userDetails,
            dob: new Date(selectedDate),
        });
    };

    const showMode = currentMode => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView>
                    <View contentContainerStyle={styles.contentContainerStyle}>
                        <View
                            style={[
                                styles.elevation,
                                styles.headerCardMargin,
                                Styles.center,
                            ]}>
                            <Text>
                                Add a thumbnail to represent your auction
                            </Text>
                            <EmptyProfileIcon />
                        </View>
                        {/*  Form Container */}
                        <View style={styles.formContainer}>
                            <Text>Auction Name</Text>
                            <TextInput_
                                text={userDetails.fullName}
                                setText={value => {
                                    setUserDetails({
                                        ...userDetails,
                                        fullName: value,
                                    });
                                }}
                                placeholder={'Auction Name'}
                            />
                            <Text>Description</Text>
                            <TextInput_
                                text={userDetails.email}
                                setText={value => {
                                    setUserDetails({
                                        ...userDetails,
                                        email: value,
                                    });
                                }}
                                focused={focus === 2}
                                setBlur={setBlur}
                                setFocus={() => {
                                    setFocus(2);
                                }}
                                placeholder={'Description'}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Next'}
                        pressHandler={() =>
                            navigation.navigate('SellerPayment')
                        }
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
    elevation: {
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 8,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    headerCardMargin: { marginVertical: 10, marginHorizontal: 17 },
    formContainer: {
        alignItems: 'center',
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
    },

    contentContainerStyle: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
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

export default AuctionDetailsScreen;
