import React from "react"
import { Text, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Test = () => {
    return (
        <ScrollView>
                <TextInput 
                        placeholder={"Me diga o que ocorreu..."} 
                        placeholderTextColor={"#303030"}
                        multiline
                        numberOfLines={8}
                        style={[styles.textInput, {marginBottom: hp(2.5), paddingBottom: hp(9)}]}
                        />

<TouchableOpacity style={styles.postbtn}>
                            <Text style={styles.btntext}>Publicar</Text>
                        </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})

export default Test