import { View, Pressable, Image} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FooterBarResponsivity";
import { Link } from "expo-router";
import React from "react";

type whatPage = {
    whatScreen: "feed" | "chat" | "user"
}

const FooterBar = (props: whatPage) => {            //"Verifica qual é a sua pagina" - Bolt
    return (
        <View style={props.whatScreen === "feed" ? [styles.footer, {backgroundColor: "#d4d7ff"}] : styles.footer} dataSet={{ media: ids.footer }}>
             {props.whatScreen === "feed" ? (
                <>
                <Link href={"./UserConfig"} asChild>
                    <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                        <Image source={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')} style={styles.img1}/>
                    </Pressable>
                </Link>
            
                <View style={styles.button} dataSet={{media: ids.button}}>
                <Pressable style={[styles.button2, {backgroundColor: '#FFF'}]} dataSet={{ media: ids.button2 }}>
                    <Image source={require('../../../../../assets/icons/icons8-casa-100.png')} style={styles.img2}/>
                </Pressable>
                </View>
            
                <Link href={"./ChatApp"} asChild>
                    <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                        <Image source={require('../../../../../assets/icons/icons8-mensagens-100.png')} style={styles.img3}/>
                    </Pressable>
                </Link>
                </>
             ) : props.whatScreen === "chat" ? (
                <>
                <Link href={"./UserConfig"} asChild>
                    <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                        <Image source={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')} style={styles.img1}/>
                    </Pressable>
                </Link>

                <Link href={"./Feed"} asChild>
                    <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                        <Image source={require('../../../../../assets/icons/icons8-casa-100.png')} style={styles.img2}/>
                    </Pressable>
                </Link>
            
                <View style={styles.button} dataSet={{media: ids.button}}>
                    <Pressable style={[styles.button2, {backgroundColor: '#d4d7ff'}]} dataSet={{ media: ids.button2 }}>
                        <Image source={require('../../../../../assets/icons/icons8-mensagens-100.png')} style={styles.img3}/>
                    </Pressable>
                </View>

                </>
             ) : (
                <>
                <View style={styles.button} dataSet={{media: ids.button}}>
                <Pressable style={[styles.button2, {backgroundColor: '#d4d7ff'}]} dataSet={{ media: ids.button2 }}>
                    <Image source={require('../../../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')} style={styles.img1}/>
                </Pressable>
                </View>
                
                <Link href={"./Feed"} asChild>
                    <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                        <Image source={require('../../../../../assets/icons/icons8-casa-100.png')} style={styles.img2}/>
                    </Pressable>
                </Link>
            
                <Link href={"./ChatApp"} asChild>
                    <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                        <Image source={require('../../../../../assets/icons/icons8-mensagens-100.png')} style={styles.img3}/>
                    </Pressable>
                </Link>
                </>
             )}
        </View>
    )
}

const {styles} = StyleSheet.create ({
    footer: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: wp(2),
        alignItems: "center",
        borderTopColor: "#0000001a",
        borderTopWidth: wp(0.9),
        bottom: 0,

        width: wp(102),
        height: hp(9),
        
    },
    button: {
        //backgroundColor: "blue",
        width: wp(30),
        height: hp(5),
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",  
    },
    button2: {
        width: wp(15),
        height: hp(5),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    img1: {
        width: 40,
        height: 40,
    },
    img2: {
        width: 35,
        height: 35,
    },
    img3: {
        width: 37,
        height: 37,
    }
})

export default FooterBar