import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CreatePost = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.plustext}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {        //<View>
        //backgroundColor: "slateblue",
        flex: 1,
        position: "absolute",
        right: 0,
        bottom: 75,     //"MUDE ISSO CASO SAIA QUEBRADO EM OUTROS TAMANHOS" - Bolt
    },
    button: {          //<TouchableOpacity>
        backgroundColor: "#000000",
        width: wp(18),
        height: hp(9),
        marginRight: 15,
        borderRadius: 5,
        alignItems: "center",
        
    },
    plustext: {     //<Text>
        fontSize: 50,   
        
    }
})

export default CreatePost