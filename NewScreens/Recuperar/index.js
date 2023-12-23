import React from 'react';
import {
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
// import { Feather, AntDesign } from '@expo/vector-icons';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';

const Recover = ({ navigation }) => {
    const handleVoltar = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.Wrapper}>
            <StatusBar backgroundColor="#f9f9f9" />
            <TouchableOpacity style={styles.Back} onPress={handleVoltar}>
                {/* <AntDesign name="left" size={24} color="black" /> */}
            </TouchableOpacity>
            <View style={styles.Header}>
                <Text style={styles.Title}>Recuperar Senha</Text>
            </View>
            <View style={styles.RecoverForm}>
                <Text style={styles.Alert}>
                    Por favor, entre com o seu endereço de email. Você irá
                    receber um email contendo um link para criar uma nova senha.
                </Text>
                <View style={styles.Email}>
                    <View style={styles.InputView}>
                        {/* <Feather name="mail" size={24} color="#db3022" /> */}
                        <TextInput
                            style={styles.Input}
                            placeholder="Email"
                            placeholderTextColor="#db3022"
                        />
                        {/* <AntDesign name="close" size={24} color="#db3022" /> */}
                        {/* <Feather name="check" size={24} color="#2AA952" /> */}
                    </View>
                </View>
                <Text style={styles.Label}>Endereço de Email invalido.</Text>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.ButtonText}>ENVIAR</Text>
                </TouchableOpacity>
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
        marginLeft: 15,
    },
    Header: {
        display: 'flex',
        justifyContent: 'center',
        padding: dynamicSize(30),
    },
    Title: {
        ...fonts.NUNITO_700_32,
        marginTop: 5,
    },
    RecoverForm: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 2,
        marginRight: 2,
    },
    Alert: {
        margin: (10, 20, 10, 20),
    },
    Label: {
        color: '#db3022',
        margin: (10, 20, 10, 20),
        ...fonts.NUNITO_500_12,
        textAlign: 'center',
    },
    Email: {
        flexDirection: 'column',
        margin: (10, 20, 10, 20),
        backgroundColor: colors.WHITE,
    },
    InputView: {
        flexDirection: 'row',
        alignItems: center,
        width: '100%',
    },
    Input: {
        height: dynamicSize(50),
        width: '80%',
        color: '#9b9b9b',
        paddingLeft: 10,
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
});

export default Recover;
