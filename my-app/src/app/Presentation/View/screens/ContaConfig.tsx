import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, View, StyleSheet, Text } from "react-native";
import UserConfigProps from "../components/UserConfig/UserConfigProps";

const ContaConfig = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [contentModal, setContentModal] = useState('');

    const handleAlterarSenha = async () => {
        setContentModal('Para alterar senha volte ao login e siga as orientações ao clicar em Redefinir Senha.');
        setModalVisible(true);
    };

    const handleConfirm = async () => {
        setModalVisible(false);
    };

    return (
        <ScrollView>
            <UserConfigProps 
                optType="header" 
                optText="Conta" 
                optLink="./UserConfig" 
                optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
            />
            <UserConfigProps optType="option" optText="Alterar dados" optLink="./ChangeData" />
            <UserConfigProps optType="button" optText="Alterar senha"/>
            <UserConfigProps optType="button" optText="Sair" optTextColor="red" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{contentModal}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#7b83ff',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ContaConfig;
