import {TextInput, Pressable, View, Image, TouchableOpacity, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./HeaderBarResponsivity";      //Ver como vamos usar isso.
import { useRef, useState } from "react";

const SearchBar = () => {
    console.log("====Startup====")
    const [isPress, setIsPress] = useState(false)
    console.log(isPress)
    const [isDisabled, setIsDisabled] = useState(false)
    console.log(isDisabled)

    const inputReference = useRef<TextInput | null>(null)
    const [isFocusing, setIsFocusing] = useState(false)
    console.log(isFocusing)
    const [isWorking, setIsWorking] = useState(false)
    console.log(isWorking)

    const pressHandle = () => {        
        console.log("====On Press====")
        setIsPress(isPress => !isPress)
        console.log(isPress)
        setIsWorking(isWorking => !isWorking)
        console.log(isWorking)
        
        setTimeout(() => {
            if (inputReference.current !== null && inputReference.current !== undefined) {
                inputReference.current.focus()
            }
        }, 500
        );
    }

    const onFocus = () => {
        console.log("====On Focus====")
        setIsFocusing(isFocusing => !isFocusing)
        console.log(isFocusing)
        setIsDisabled(isDisabled => !isDisabled)
        console.log(isDisabled)
    }

    const onBlur = () => {
        console.log("====On Blur====")
        setIsFocusing(isFocusing => !isFocusing)
        console.log(isFocusing)
        setIsDisabled(isDisabled => !isDisabled)
        console.log(isDisabled)
        setIsWorking(isWorking => !isWorking)
        console.log(isWorking)
    }

    return (
        <View style={styles.buttonview}>
            <TextInput style={isFocusing == true ? styles.textInputOn : styles.TextInputOff}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={inputReference}
            editable={isWorking}
            />

            <TouchableOpacity style={styles.button} onPress={pressHandle} disabled={isDisabled}>
                <Image source={require('../../../../assets/icons/icons8-pesquisar-64.png')} style={styles.img}/>
            </TouchableOpacity>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    buttonview: {
        position: "absolute",
        right: 0,      // <-- SE A LUPA ESTIVER NO LUGAR ERRADO MUDE ESSE VALOR
        //backgroundColor: "slateblue",
        flexDirection: "row-reverse",
        alignItems: "center",
        width: wp(50),
        marginRight: wp(3),
    },
    button: {
        //backgroundColor: "blue",
        position: "absolute",
        borderRadius: 5,        
        opacity: 100,
    },
    img: {
        width: 40,
        height: 40,
    },
    textInputOn: {
        backgroundColor: "slateblue",
        paddingVertical: hp(0.8),
        position: "absolute",
        width: wp(55),
        borderRadius: 5,

        color: "#FFF",
        textAlign: "right",
        paddingRight: wp(12)
    },
    TextInputOff: {
           
    }
})

export default SearchBar