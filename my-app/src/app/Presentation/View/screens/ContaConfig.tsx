import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, View, StyleSheet, Text } from "react-native";
import UserConfigProps from "../components/UserConfig/UserConfigProps";
import ModalComponent from "../components/ModalComponent";
import { router } from "expo-router";
import UserPersistence from "../../../Service/Persistence/UserPersistence";
import { removeItemFromStorage } from "../../../Data Access/Storage/removeItemFromStorage"

const ContaConfig = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLogOutVisible, setModalLogOutVisible] = useState(false)
    const [contentModal, setContentModal] = useState('');

    const handleAlterarSenha = async () => {
        setContentModal('Para alterar senha volte ao login e siga as orientações ao clicar em Redefinir Senha.');
        setModalVisible(true);
    };

    const handleConfirm = async () => {
        setModalVisible(false);
    };

    const handleLogOut = async () => {
        setContentModal('Você deseja sair da sua conta ?')
        setModalLogOutVisible(true)
    }
    const handleConfirmLogOut = async() => {
        try {
            const InstanceUser = UserPersistence.getInstance()
        InstanceUser.clearUser()
        removeItemFromStorage('uid')
        removeItemFromStorage('email')
        removeItemFromStorage('name')
        setModalLogOutVisible(false)
        router.push('/')
        } catch (error) {
            console.log(error)
        }
        }
    const handleCancelLogOut = async() => {
        setModalLogOutVisible(false)
    }

    return (
        <ScrollView>
            <UserConfigProps 
                optType="header" 
                optText="Conta" 
                optLink="./UserConfig" 
                optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
            />
            <UserConfigProps optType="option" optText="Alterar dados" optLink="./ChangeData" />
            <UserConfigProps optType="button" optText="Alterar senha" optFunction={handleAlterarSenha}/>
            <UserConfigProps optType="button" optText="Sair" optTextColor="red" optFunction={handleLogOut}/>
            <ModalComponent isVisible={modalVisible} content={contentModal} onPress={handleConfirm} Category={"Single Action"} />
            <ModalComponent isVisible={modalLogOutVisible} content={contentModal} onPress={handleConfirmLogOut} optionalonPress={handleCancelLogOut} Category={"Dual Action"} />
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
    buttonPress: {
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
