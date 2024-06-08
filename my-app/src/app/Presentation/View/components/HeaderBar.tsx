import {Image, View, Pressable, TouchableOpacity, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./HeaderBarResponsivity";
import SearchBar from "./SearchBar";
import React from "react";
import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import { Href } from "expo-router/build/link/href";

type whatPage = {
    whatScreen: "feed" | "user" | "chat" | "comment" | "auth"
    whatLink?: string
}

const HeaderBar = (props: whatPage) => {    
    return (
        <View style={props.whatScreen === "feed" ? [styles.header, {backgroundColor: "#d4d7ff"}] : styles.header}>
            
            {props.whatScreen === "chat" ? ( //"Buscar nome de usuário pra mostrar aqui:" - Bolt
                <Link href={`${props.whatLink}`} asChild>
                    <TouchableOpacity>
                        <Image source={require('../../../../../assets/icons/icons8-esquerda-2-100.png')} 
                        style={styles.imghdr} />
                    </TouchableOpacity>
                </Link>
            ) : props.whatScreen === 'auth' ? (
                <Link href={`${props.whatLink}`} asChild>
                    <TouchableOpacity>
                        <Image source={require('../../../../../assets/icons/icons8-esquerda-2-100.png')} 
                        style={styles.imghdr} />
                    </TouchableOpacity>
                </Link>
            ) : props.whatScreen === "comment" ? (
                <View style={{flexDirection: "row", alignItems: "center"}}>
                <Link href={"../screens/Feed"} asChild>
                    <TouchableOpacity>
                    <Image source={require('../../../../../assets/icons/icons8-esquerda-2-100.png')} 
                    style={styles.imghdr} />
                    </TouchableOpacity>
                </Link>

                <Text style={styles.commenttext}> Mensagens</Text>
                </View>
            ) : (
                <Image source={require('../../../../../assets/icons/2-removebg-preview.png')} style={styles.icon} />
            )}
            
                
            {props.whatScreen === "user" ? ( //"Componente á direita" - Bolt
                <Link href={'../screens/UserConfig'} asChild>
                    <TouchableOpacity style={styles.hdrGear}>
                    <Image source={require("../../../../../assets/icons/icons8-configurações-100.png")} 
                    style={styles.img}
                    />
                    </TouchableOpacity>
                </Link>
            ) : (
                <></>
            )}     

        </View>
    )
}

const {styles} = StyleSheet.create ({
    header: {
        //backgroundColor: "#d4d7ff",
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
    },
    imghdr: {
        width: 35,
        height: 35,
        marginHorizontal: wp(3),
    },
    commenttext: {
        color: "#400096",
        fontSize: 19,
        fontWeight: "bold"
    }
})

export default HeaderBar