import { Link } from "expo-router"
import React from "react"
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

type optProps = {
    optType: "header" | "option" | "button",
    optText: string,
    optTextColor?: string,
    optImgUrl?: ImageSourcePropType,
    optLink?: string,
}

const UserConfigProps = (props: optProps) => {
    let isHeader = props.optType    
    let textColor = props.optTextColor
    

    return (
    <View style={isHeader == "header" ? styles.header : styles.option}>
        { props.optType === "header" ? (
            <>
                <Link href={`${props.optLink}`} asChild>
                    <TouchableOpacity>
                        <Image source={props.optImgUrl} style={styles.imghdr}/>
                    </TouchableOpacity>
                </Link>
                <Text style={styles.hdrText}> {props.optText} </Text>
            </>
        ) : props.optType === "option" ? (
            <>
                <Link href={`${props.optLink}`} asChild>
                    <TouchableOpacity style={props.optImgUrl != undefined ? styles.optionChild : styles.buttonChild}>
                        {props.optImgUrl != undefined ? 
                            (<Image source={props.optImgUrl} style={styles.img}/>)
                        : (null)}
                        <Text style={styles.optText}> {props.optText} </Text>  
                    </TouchableOpacity>
                </Link>
            </>
        ) : (
            <>
                <TouchableOpacity style={styles.buttonChild}>
                        <Text style={[styles.optText, props.optTextColor != undefined ? {color: props.optTextColor} : null]}> 
                            {props.optText} 
                        </Text>  
                </TouchableOpacity>
            </>
        )}
    </View>
)
}

const styles = StyleSheet.create ({
    header: {
        backgroundColor: "#d4d7ff",
        borderBottomColor: "#888888",
        borderBottomWidth: 2,
        
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 5,
    },
    hdrText: {
        color: "#400096",
        fontSize: 19,
        fontWeight: "bold"
    },
    option: {
        borderBottomColor: "#888888",
        borderBottomWidth: 2,
    },
    optionChild: {
        paddingVertical: 7,
        paddingLeft: 2,

        flexDirection: "row",
        alignItems: "center",
    },
    buttonChild: {
        paddingVertical: 14,
        paddingLeft: 10,

        flexDirection: "row",
        alignItems: "center"
    },
    optText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    imghdr: {
        width: 30,
        height: 30,
        marginHorizontal: wp(1),
    },
    img: {
        width: 35,
        height: 35,
        marginLeft: wp(1),
    }
})

export default UserConfigProps