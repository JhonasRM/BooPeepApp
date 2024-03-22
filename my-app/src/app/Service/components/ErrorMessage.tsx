import { Image, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query"

const ErrorMessage = ({ message }) => {

    return (
        <View style={styles.Errorbox}>
            <Image source={require('../../../../assets/icons/icons8-erro-100.png')} style={styles.Warningimg}/>
            <Text style={styles.Wrongtext}>Algo deu errado.</Text>
            <View style={styles.Errorview}>
                <Text style={styles.Errortext}> Erro: {message} </Text>
            </View>
            <Text style={styles.Wrongtext}>Puxe para cima para tentar recarregar novamente.</Text>
        </View>            
    )
}

const {styles} = StyleSheet.create({
    Errorbox: {
        width: wp(100),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO ERRO CABER NA TELA
        height: hp(82),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO ERRO CABER NA TELA
        justifyContent: "center"
    },
    Warningimg: {
        alignSelf: "center"
    },
    Wrongtext: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        marginVertical: hp(2),
    },
    Errortext: {
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 14,
    },
    Errorview: {
        backgroundColor: "red",
        paddingVertical: hp(3),
        marginHorizontal: wp(3),
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 3,
    }
})

export default ErrorMessage;