import { Image, ScrollView, Text, View } from "react-native"
import { Link } from "expo-router";
import UserConfigProps from "../components/UserConfig/UserConfigProps";
import React from "react";

const UserConfig = () => {
    return (
    <ScrollView>
        <UserConfigProps optType="header" optText="Configurações de Usuário" optLink="./User"
        optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
        />

        <UserConfigProps optType="option" optText="Conta" optLink="./ContaConfig"
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />

        <UserConfigProps optType="option" optText="Sobre" optLink="./Aboutus"
        optImgUrl={require('../../../../../assets/icons/icons8-info-100.png')}
        />
    </ScrollView>
    )

    

}

export default UserConfig