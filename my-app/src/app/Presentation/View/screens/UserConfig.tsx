import { Image, ScrollView, Text, View } from "react-native"
import { Link } from "expo-router";
import UserConfigProps from "../../../Service/components/UserConfigProps"

const UserConfig = () => {
    return (
    <ScrollView>
        <UserConfigProps optType="header" optText="Configurações de Usuário" optLink="./Feed"
        optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
        />

        <UserConfigProps optType="option" optText="Conta" optLink="./ContaConfig"
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />

        <UserConfigProps optType="option" optText="Notificações" optLink="./NotificationConfig"
        optImgUrl={require('../../../../../assets/icons/icons8-mensagem-de-bate-papo-100_Single.png')}
        />

        <UserConfigProps optType="option" optText="Preferências" optLink="./PreferenceConfig"
        optImgUrl={require('../../../../../assets/icons/icons8-opções-de-ordenação-100.png')}
        />

        <UserConfigProps optType="option" optText="Sobre" optLink="./Aboutus"
        optImgUrl={require('../../../../../assets/icons/icons8-info-100.png')}
        />
    </ScrollView>
    )

    

}

export default UserConfig