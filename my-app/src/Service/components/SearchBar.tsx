import {TextInput, Pressable, View, Image, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./HeaderBarResponsivity";
import { useState } from "react";

const SearchBar = () => {
    const [Press, setPress] = useState(false);
    const buttonstyle = styles.button

    if (Press == false) {
        const buttonstyle = styles.button
        const buttonid = {media: ids.button}
    }
    else {
        const buttonstyle = styles.buttonoff
    }


    return (
        <View>
            <TextInput />
            <Pressable style={buttonstyle} dataSet={{media: ids.button}} onPressIn={() => {setPress(true)}}>
                <Image source={require('../../../assets/icons/icons8-pesquisar-64.png')} style={styles.img}/>
            </Pressable>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    button: {
        //backgroundColor: "slateblue",
        width: wp(2),
        height: hp(2),
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 0,
        opacity: 100,
    },
    buttonoff: {
        backgroundColor: "#FFF"
    },
    img: {
        width: 50,
        height: 50,
    },
})

export default SearchBar