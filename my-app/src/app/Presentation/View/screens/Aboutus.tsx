import { ScrollView } from "react-native"
import UserConfigProps from "../../../Service/components/UserConfigProps"

const Aboutus = () => {
    return (
        <ScrollView>
            <UserConfigProps optType="header" optText="Sobre" optLink="./UserConfig"
            optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}/>
        </ScrollView>
    )
}
export default Aboutus