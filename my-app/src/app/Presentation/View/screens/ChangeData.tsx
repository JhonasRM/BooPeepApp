import React from "react"
import UserConfigProps from "../components/UserConfig/UserConfigProps"

const ChangeData = () => {
    return (
        <>
        <UserConfigProps optType="header" optText="Dados" optLink="./ContaConfig" 
        optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}/>

        {/* "Criar os TextInputs aqui Igor" - Bolt */}
        </>
    )
}

export default ChangeData