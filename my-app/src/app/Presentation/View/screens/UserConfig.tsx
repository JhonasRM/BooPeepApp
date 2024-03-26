import { Image, ScrollView, Text, View } from "react-native"
import { Link } from "expo-router";
import UserConfigProps from "../../../Service/components/UserConfigProps"

const UserConfig = () => {
    return (
    <ScrollView>
        <UserConfigProps optType="header" optText="Configurações de Usuário" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 1" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 2" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 3" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 4" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 5" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 6" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
        <UserConfigProps optType="option" optText="Option 7" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}/>
    </ScrollView>
    )
}

export default UserConfig