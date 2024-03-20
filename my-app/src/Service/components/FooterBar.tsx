import { View, Pressable, Image} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FooterBarResponsivity";

const FooterBar = () => {
    return (
        <View style={styles.footer} dataSet={{ media: ids.footer }}>
            <Pressable style={styles.button} dataSet={{ media: ids.button }}>
                <Image source={require('../../../assets/icons/icons8-usuário-homem-com-círculo-100.png')} style={styles.img1}/>
            </Pressable>
            <Pressable style={styles.button2} dataSet={{ media: ids.button2 }}>  
                <Image source={require('../../../assets/icons/icons8-casa-100.png')} style={styles.img2}/>
            </Pressable>
            <Pressable style={styles.button} dataSet={{ media: ids.button }}> 
                <Image source={require('../../../assets/icons/icons8-mensagens-100.png')} style={styles.img3}/>
            </Pressable>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    footer: {
        position: "relative",
        backgroundColor: "#d4d7ff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(2),
        alignItems: "center",
        shadowOffset: {height: hp(1.3), width: wp(1.3)},
        shadowRadius: 20,
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
        backgroundColor: '#FFF',
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
    },
})

export default FooterBar