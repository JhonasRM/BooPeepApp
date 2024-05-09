import {Image, View, Pressable, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./HeaderBarResponsivity";
import SearchBar from "./SearchBar";
import React from "react";
import { Link } from "expo-router";

type whatPage = {
    whatScreen: "feedchat" | "user"
}

const HeaderBar = (props: whatPage) => {
    return (
            <View style={styles.header} dataSet={{media: ids.header}}>
            <Image source={require('../../../../../assets/icons/2-removebg-preview.png')} style={styles.icon} />
                {props.whatScreen === "feedchat" ? (
                    <SearchBar />
                ) : (
                    <Link href={'../screens/UserConfig'} asChild>
                    <TouchableOpacity style={styles.hdrGear}>
                    <Image source={require("../../../../../assets/icons/icons8-configurações-100.png")} 
                    style={styles.img}
                    />
                    </TouchableOpacity>
                    </Link>
                )
                }
            </View>
    )
}

const {styles} = StyleSheet.create ({
    header: {
        backgroundColor: "#d4d7ff",
        height: hp(9),
        width: wp(100),
        
        flexDirection: "row",
        alignItems: "center",

        borderBottomColor: "#0000001a",
        borderBottomWidth: wp(0.9),
        
    },
    icon: {
        width: 120,
        height: 44,
        marginLeft: wp(2),
        marginTop: hp(2),
        marginBottom: hp(2)
    },
    img: {
        width: 40,
        height: 40,
    },
    hdrGear: {
        position: "absolute",
        right: 0,
        marginRight: wp(3),
    }
})

export default HeaderBar