import StyleSheet from "react-native-media-query"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image, View } from "react-native"

const LoadingBox = () => {
    return (
    <View style={styles.loadingbox}>
        <Image source={require('../../../assets/gifs/icons8-círculo-de-carga.gif')} style={styles.loadinggif} />
    </View>
    )
}

const {styles} = StyleSheet.create ({
    loadingbox: {
        width: wp(100),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO CARREGAMENTO CABER NA TELA
        height: hp(82),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO CARREGAMENTO CABER NA TELA
        justifyContent: "center",
        alignItems: "center"
    },
    loadinggif: {
        width: 100,
        height: 100,
    },
})

export default LoadingBox;