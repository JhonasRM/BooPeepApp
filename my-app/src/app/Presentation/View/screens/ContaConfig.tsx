import { ScrollView } from "react-native"
import UserConfigProps from "../components/UserConfig/UserConfigProps"
import React = require("react")
//import React from "react"

const ContaConfig = () => {
    return (
    <ScrollView>
        <UserConfigProps optType="header" optText="Conta" optLink="./UserConfig" 
        optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
        />
        <UserConfigProps optType="option" optText="Alterar dados" optLink="./ChangeData" />
        <UserConfigProps optType="button" optText="Alterar senha" />
        <UserConfigProps optType="button" optText="Sair" optTextColor="red"/>
    </ScrollView>
    )
}

export default ContaConfig