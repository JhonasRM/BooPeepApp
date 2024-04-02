import { ScrollView } from "react-native"
import UserConfigProps from "../../../Service/components/UserConfigProps"

const ContaConfig = () => {
    return (
    <ScrollView>
        <UserConfigProps optType="header" optText="Conta" optLink="./UserConfig" 
        optImgUrl={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')}
        />
        <UserConfigProps optType="option" optText="Alterar dados" optLink="." />
        <UserConfigProps optType="option" optText="Alterar senha" optLink="." />
        <UserConfigProps optType="button" optText="Sair" optTextColor="red"/>
    </ScrollView>
    )
}

export default ContaConfig