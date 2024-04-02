import { Image, ScrollView, Text, View } from "react-native"
import { Link } from "expo-router";
import UserConfigProps from "../../../Service/components/UserConfigProps"

const UserConfig = () => {
    return (
    <ScrollView>
        <UserConfigProps optType="header" optText="Configurações de Usuário" optLink="./Feed"
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />

        <UserConfigProps optType="option" optText="Conta" optLink="./ContaConfig"
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />

        <UserConfigProps optType="option" optText="Notificações" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />

        <UserConfigProps optType="option" optText="Preferências" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />

        <UserConfigProps optType="option" optText="Sobre" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />
    </ScrollView>
    )

    

}

export default UserConfig