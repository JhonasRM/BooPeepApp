import { ScrollView } from "react-native"
import UserConfigProps from "../components/UserConfig/UserConfigProps"
import React from "react"

const NotificationConfig = () => {
    return (
        <ScrollView>
            <UserConfigProps optType="header" optText="Notificações" optLink="./UserConfig"
            optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}/>
        </ScrollView>
    )
}
export default NotificationConfig