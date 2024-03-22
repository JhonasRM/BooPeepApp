import {Image, View, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./HeaderBarResponsivity";
import SearchBar from "./SearchBar";

const HeaderBar = () => {
    return (
        <View style={styles.header} dataSet={{media: ids.header}}>
            <Image source={require('../../../../assets/icons/2-removebg-preview.png')} style={styles.icon} />
            <SearchBar />
            {/* <Pressable style={styles.button} dataSet={{media: ids.button}}><Image source={require('../../../assets/icons/icons8-pesquisar-64.png')} style={styles.img} /></Pressable> */}
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
        width: 130,
        height: 55,
        marginLeft: wp(2),
        marginTop: hp(2),
        marginBottom: hp(2)
    }
})

export default HeaderBar