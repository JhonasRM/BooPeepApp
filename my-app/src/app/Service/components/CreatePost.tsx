import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FeedBlock from "./FeedBlock";

const CreatePost = () => {
    const [isTouched, setIsTouched] = useState(false)

    const pressHandler = () => {
        setIsTouched(!isTouched)
    }

    return (
        <KeyboardAvoidingView 
        behavior="padding"
        style={isTouched ? styles.containerOn : styles.containerOff}
        >
            <TouchableOpacity style={isTouched ? styles.buttonOff : styles.buttonOn}
            onPress={pressHandler}>
                <Text style={styles.plustext}>+</Text>
            </TouchableOpacity>

            <View style={isTouched ? styles.formOn : styles.formOff}>
                <TouchableWithoutFeedback>
                    <ScrollView keyboardShouldPersistTaps={"handled"}>

                        <TouchableOpacity style={styles.exitbutton} onPress={pressHandler}>
                            <Image source={require("../../../../assets/icons/icons8-fechar-janela-100.png")} 
                            style={styles.exitimg}
                            />
                        </TouchableOpacity>
                        
                        <Text style={styles.labeltext}>Criar postagem</Text>

                        <TextInput 
                        placeholder={"Título da postagem"} 
                        placeholderTextColor={"slateblue"}
                        style={styles.textInput}
                        />

                        <TextInput 
                        placeholder={"Me diga o que ocorreu..."} 
                        placeholderTextColor={"slateblue"}
                        multiline
                        numberOfLines={10}
                        style={styles.textInput}
                        />

                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
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
        color: "#ffffff"
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
        fontSize: 30,
        marginBottom: hp(2),
    },
    textInput: {
        backgroundColor: "#303556",
        paddingHorizontal: wp(2),
        paddingTop: hp(1),
        marginVertical: hp(0.5),
        textAlignVertical: "top",
        borderRadius: 10,

        color: "slateblue",
    },
    exitbutton: {
        position: "absolute",
        top: 0,
        right: 0,
        height: 40,
        width: 40,
    },
    exitimg: {
        width: 40,
        height: 40,
    }
})

export default CreatePost