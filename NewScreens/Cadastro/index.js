import React from 'react';
// import { StatusBar } from "react-native";
// import { SimpleLineIcons, Feather, AntDesign } from "@expo/vector-icons";
import googleIcon from '../assets/google.png';
import facebookIcon from '../assets/facebook.png';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';

const Cadastro = ({ navigation }) => {
    const handleVoltar = () => {
        navigation.goBack();
    };
    const handleLogin = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={styles.Wrapper}>
            {/* <StatusBar backgroundColor="#f9f9f9" /> */}
            <TouchableOpacity style={styles.Back} onPress={handleVoltar}>
                {/* <AntDesign name="left" size={24} color="black" /> */}
            </TouchableOpacity>
            <View style={styles.Header}>
                <Text style={styles.Title}>Sign Up</Text>
            </View>
            <View style={styles.SignUpForm}>
                <View style={styles.Email}>
                    <View style={styles.InputView}>
                        {/* <Feather name="user" size={24} color="#9B9B9B" /> */}
                        <TextInput
                            style={styles.Input}
                            placeholder="Name"
                            placeholderTextColor="#9B9B9B"
                        />
                        {/* <Feather name="check" size={24} color="#2AA952" /> */}
                    </View>
                </View>
                <View style={styles.Email}>
                    <View style={styles.InputView}>
                        {/* <Feather name="mail" size={24} color="#9B9B9B" /> */}
                        <TextInput
                            style={styles.Input}
                            placeholder="Email"
                            placeholderTextColor="#9B9B9B"
                            value="patrick.tafa@gmail.com"
                        />
                        {/* <Feather name="check" size={24} color="#2AA952" /> */}
                    </View>
                </View>
                <View style={styles.Password}>
                    <View style={styles.InputView}>
                        {/* <Feather name="mail" size={24} color="#9B9B9B" /> */}
                        <TextInput
                            style={styles.PasswordInput}
                            secureTextEntry={true}
                            placeholder="Password"
                            placeholderTextColor="#9B9B9B"
                        />
                        {/* <Feather name="check" size={24} color="#2AA952" /> */}
                    </View>
                </View>
                <View style={styles.Actions}>
                    <TouchableOpacity
                        style={styles.AlreadyContainer}
                        onPress={handleLogin}>
                        <Text style={styles.AlreadyAccount}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.ButtonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Footer}>
                <Text style={styles.TitleFooter}>
                    Or sign Up with social account:
                </Text>
                <View style={styles.ActionsFooter}>
                    <TouchableOpacity style={styles.Google}>
                        <Image style={styles.Imagem} source={googleIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Facebook}>
                        <Image style={styles.Imagem} source={facebookIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Wrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
    },
    Back: {
        marginLeft: dynamicSize(15),
    },
    Header: {
        display: 'flex',
        justifyContent: 'center',
        padding: dynamicSize(30),
    },
    Title: {
        ...fonts.NUNITO_700_24,
        marginTop: 5,
    },
    SignUpForm: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 2,
        marginRight: 2,
    },
    Email: {
        flexDirection: 'column',
        margin: (10, 20, 10, 20),
        backgroundColor: colors.WHITE,
    },
    Password: {
        flexDirection: 'column',
        margin: (10, 20, 10, 20),
        backgroundColor: colors.WHITE,
    },
    InputView: {
        flexDirection: 'row',
        alignitems: 'center',
        width: '100%',
    },
    Input: {
        height: dynamicSize(50),
        width: '80%',
        color: '#9b9b9b',
        paddingLeft: 10,
    },
    PasswordInput: {
        height: dynamicSize(50),
        width: '80%',
        color: '#9b9b9b',
        paddingLeft: 10,
    },
    Actions: {
        flexDirection: 'row',
        height: dynamicSize(50),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    AlreadyContainer: {
        height: '100%',
        margin: dynamicSize(30),
    },
    AlreadyAccount: {
        color: '#db3022',
        textDecoration: 'underline',
    },
    Button: {
        backgroundColor: '#db3022',
        height: dynamicSize(50),
        margin: dynamicSize(30),
        borderRadius: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: colors.WHITE,
    },
    Footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    TitleFooter: {},
    ActionsFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    Google: {
        margin: 10,
    },
    Imagem: {
        width: dynamicSize(40),
        height: dynamicSize(40),
    },
    Facebook: {
        margin: 10,
    },
});

export default Cadastro;
