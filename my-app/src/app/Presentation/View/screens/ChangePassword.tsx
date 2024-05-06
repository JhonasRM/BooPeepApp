import React from "react"
import UserConfigProps from "../components/UserConfig/UserConfigProps"

const ChangePassword = () => {
    return (
        <>
            <UserConfigProps optType="header" optText="Senha" optLink="./ContaConfig"
            optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}/>
        </>
    )
}

export default ChangePassword