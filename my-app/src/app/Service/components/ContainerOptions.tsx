import { useState } from "react"
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"

interface Props {
    style?: StyleProp<ViewStyle> //"Isso será usado para receber o estilo do Parent!" - Bolt
}

const ContainerOptions = (props: Props) => {
    const [isPress, setIsPress] = useState(false)

    const handlePress = () => {
        setIsPress(isPress => !isPress)
    }
    //if/else based on click boolean
    //Will open a menu and hide the icon image

    return (
        <TouchableOpacity style={props.style} onPress={handlePress}>
            { isPress == false ? (
            <Image source={require('../../../../assets/icons/icons8-menu-2-24.png')}/>
            ) : (
            <View style={styles.optionsmenu}>
                    <TouchableOpacity style={styles.optioncontainer}>
                        <Image source={require('../../../../assets/icons/icons8-menu-2-24.png')} style={styles.btnImg}/>
                        <Text style={styles.btnText}>Denunciar Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optioncontainer}>
                        <Image source={require('../../../../assets/icons/icons8-menu-2-24.png')} style={styles.btnImg}/>
                        <Text style={styles.btnText}>Denunciar Post</Text>
                    </TouchableOpacity>
            </View>
            )}
        </TouchableOpacity>
    )
}

//IMPORTANTE: SUBSTITUIR TUDO QUE ENVOLVE O "styles.optionsmenu" COM OS BOTÕES DO "UserConfigProps"

const styles = StyleSheet.create({
    optionsmenu: {
        borderRadius: 5,
    },
    optioncontainer: {
        
        backgroundColor: "purple",
        borderRadius: 5,

        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginVertical: 2,
        paddingRight: 10,
        marginHorizontal: 4,
    },
    btnImg: {
        
    },
    btnText: {
        fontWeight: "bold"
    },
})

export default ContainerOptions