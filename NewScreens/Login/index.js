import React from 'react';
// import { StatusBar } from "react-native";
// import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import googleIcon from '../assets/google.png';
import facebookIcon from '../assets/facebook.png';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { Image, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';

const LoginNew = ({ navigation }) => {
    const handleCadastro = () => {
        navigation.navigate('Cadastro');
    };
    const handleRecuperar = () => {
        navigation.navigate('Recuperar');
    };
    const handleLogin = () => {
        navigation.navigate('App');
    };

    return (
        <View style={styles.Wrapper}>
            {/* <StatusBar backgroundColor="#f9f9f9" /> */}
            <View style={styles.Header}>
                <Text style={styles.Title}>Login</Text>
            </View>
            <View style={styles.LoginForm}>
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
                            placeholder="Senha"
                            placeholderTextColor="#9B9B9B"
                        />
                        {/* <SimpleLineIcons name="eye" size={24} color="#9B9B9B" /> */}
                    </View>
                </View>
                <View style={styles.Actions}>
                    <TouchableOpacity
                        style={styles.ForgotContainer}
                        onPress={handleRecuperar}>
                        <Text style={styles.ForgotPass}>
                            Esqueceu sua senha?
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.Button} onPress={handleLogin}>
                    <Text style={styles.ButtonText}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Footer}>
                <Text style={styles.TitleFooter}>Ou entre com sua conta:</Text>
                <View style={styles.ActionsFooter}>
                    <TouchableOpacity style={styles.Google}>
                        <Image style={styles.Imagem} source={googleIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Facebook}>
                        <Image style={styles.Imagem} source={facebookIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.TitleFooter} onPress={handleCadastro}>
                    Não possui conta? Cadastre-se
                </Text>
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
    Header: {
        height: dynamicSize(100),
        display: 'flex',
        justifyContent: 'center',
    },
    Title: {
        ...fonts.NUNITO_700_32,
        margin: dynamicSize(30),
    },
    LoginForm: {
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
        alignItems: 'center',
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
    ForgotContainer: {
        height: '100%',
        margin: dynamicSize(30),
    },
    ForgotPass: {
        color: '#db3022',
        textDecoration: 'underline',
    },
    Button: {
        backgroundColor: '#db3022',
        height: dynamicSize(50),
        margin: dynamicSize(30),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: colors.WHITE,
    },
    Footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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

export default LoginNew;
