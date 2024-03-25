import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CreatePost = () => {
    const [isTouched, setIsTouched] = useState(false)

    const pressHandler = () => {
        setIsTouched(!isTouched)
    }

    return (
        <View style={isTouched ? styles.containerOn : styles.containerOff}>
            <TouchableOpacity style={isTouched ? styles.buttonOff : styles.buttonOn}
            onPress={pressHandler}>
                <Text style={styles.plustext}>+</Text>
            </TouchableOpacity>

            <View style={isTouched ? styles.formOn : styles.formOff}>
                <Text style={styles.labeltext}>Criar postagem</Text>
                <TextInput placeholder={"Me diga o que ocorreu..."} 
                placeholderTextColor="slateblue" style={styles.textInput}/>

                <TouchableOpacity style={styles.exitbutton} onPress={pressHandler}>
                    <Text style={styles.labeltext}>x</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    containerOn: {        //<View>
        backgroundColor: "#ffffff",
        flex: 1,
        position: "absolute",
        right: 0,
        left: 0,
        top: hp(40),     //"MUDE ISSO CASO SAIA QUEBRADO EM OUTROS TAMANHOS" - Bolt
        bottom: 0,
        borderTopStartRadius: 30,
    },
    containerOff: {
        flex: 1,
        position: "absolute",
        right: 0,
        bottom: hp(0.1),
    },
    buttonOn: {          //<TouchableOpacity>
        backgroundColor: "#000000",
        width: wp(18),
        height: hp(9),
        marginRight: 15,
        borderRadius: 5,
        alignItems: "center",
        position: "absolute",
        right: 0,
        bottom: hp(10),
        
        display: "flex"     //"Isso irá mostrar o botão."
    },
    buttonOff: {
        display: "none"
    },
    plustext: {     //<Text>
        fontSize: 50,         
    },
    formOn: {
        display: "flex",
        marginTop: hp(3),
        marginHorizontal: wp(4),
    },
    formOff: {
        display: "none"
    },
    labeltext: {
        fontSize: 28,
        marginBottom: hp(1),
    },
    textInput: {
        backgroundColor: "#ffffff",
        color: "slateblue"
    },
    exitbutton: {
        position: "absolute",
        top: 0,
        right: 0,
    }
})

export default CreatePost