import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FeedBlock from "./Feed/FeedBlock";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CreatePost = () => {
    const [isTouched, setIsTouched] = useState(false)
    const [image, setImage] = useState<string | null>(null) //"Quando der erro de Tipo com 'useState', use um Generics com os tipos que faltam" - Bolt

    const pressHandler = () => {
        setIsTouched(!isTouched)
    }

    const imageHandler = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    

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
                        <FontAwesome name="user-circle" size={40} color="black" style={{marginBottom: -40}} />

                        <TextInput 
                        placeholder={"Título da postagem"} 
                        placeholderTextColor={"#303030"}
                        style={[styles.textInput, {marginTop: hp(7)}]}
                        /> 
                        {/* "Esse não troca a cor automaticamente no Dark Mode do Expo" - Bolt */}

                        <TextInput 
                        placeholder={"Me diga o que ocorreu..."} 
                        placeholderTextColor={"#303030"}
                        multiline
                        numberOfLines={10}
                        style={[styles.textInput, {marginBottom: hp(2.5), paddingHorizontal: 3}]}
                        />
                        {/* "Esse não troca a cor automaticamente no Dark Mode do Expo" - Bolt */}

                        <TouchableOpacity style={styles.postbtn}>
                            <Text style={styles.btntext}>Publicar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imagebutton} onPress={imageHandler}>
                        <MaterialCommunityIcons name="image-filter-hdr" size={40} color="#400096" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.exitbutton} onPress={pressHandler}>
                            <MaterialCommunityIcons name="exit-to-app" size={40} color="#400096" />
                        </TouchableOpacity>

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
        marginRight: wp(38),

        borderBottomWidth: 3,
        borderRadius: 5,
        borderBottomColor: "#000", //Precisa do isDark useState
    },
    textInput: {
        backgroundColor: "#d4d7ff", //Precisa do isDark useState
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        marginVertical: hp(1),
        textAlignVertical: "top",
        borderRadius: 10,
        fontSize: 15,
        textAlign: "justify",
        
    },
    imagebutton: {
        position: "absolute",
        bottom: 0,
        right: wp(29),
        height: 40,
        width: 40,
        paddingTop: 1,
    },
    imageimg: {
        width: 37,
        height: 37,
    },
    postbtn: {
        backgroundColor: "#400096",
        borderRadius: 10,

        marginLeft: wp(68),
        paddingVertical: hp(1),
    },
    btntext: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold"
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
    },
})

export default CreatePost