import { Link } from "expo-router"
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type optProps = {
    optType: "header" | "option",
    optText: string,
    optImgUrl: ImageSourcePropType
}

const UserConfigProps = (props: optProps) => {
    let isHeader = props.optType

    return (
    <View style={isHeader == "header" ? styles.header : styles.option}>
        { props.optType === "header" ? (
            <>
                <Link href={"./Feed"} asChild>
                    <TouchableOpacity>
                        <Image source={props.optImgUrl} style={styles.imghdr}/>
                    </TouchableOpacity>
                </Link>
                <Text style={styles.hdrText}> {props.optText} </Text>
            </>
        ) : (
            <>
                <TouchableOpacity style={styles.optionChild}>
                    <Image source={props.optImgUrl} style={styles.img}/>
                    <Text style={styles.optText}> {props.optText} </Text>  
                </TouchableOpacity>
            </>
        )}
    </View>
)
}

const styles = StyleSheet.create ({
    header: {
        backgroundColor: "slateblue",
        borderBottomColor: "#888888",
        borderBottomWidth: 2,
        
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 5,
    },
    hdrText: {
        color: "purple",
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
    optText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    imghdr: {
        width: 40,
        height: 40
    },
    img: {
        width: 35,
        height: 35,
    }
})

export default UserConfigProps