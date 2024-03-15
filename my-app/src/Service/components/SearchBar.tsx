import {TextInput, Pressable, View, Image, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./HeaderBarResponsivity";

const SearchBar = () => {
    return (
        <View style={styles.buttonview}>
            <Pressable style={styles.button} dataSet={{media: ids.button}}>
                <Image source={require('../../../assets/icons/icons8-pesquisar-64.png')} style={styles.img}/>
            </Pressable>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    buttonview: {
        position: "absolute",
        right: 0,      // <-- SE A LUPA ESTIVER NO LUGAR ERRADO MUDE ESSE VALOR
    },
    button: {
        //backgroundColor: "slateblue",
        marginRight: wp(2),
        borderRadius: 5,        
        opacity: 100,
    },
    img: {
        width: 50,
        height: 50,
    },
})

export default SearchBar