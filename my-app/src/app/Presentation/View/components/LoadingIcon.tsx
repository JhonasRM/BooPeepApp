import StyleSheet from "react-native-media-query"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image, View } from "react-native"
import React from "react";

type loadingBoxProps = {
    whatPage: "Feed" | "Comment" | "Auth"
}

const LoadingBox = (props: loadingBoxProps) => {
    return (
    <>
    { props.whatPage == "Feed" || props.whatPage == "Auth" ? (
    <View style={[styles.loadingbox, styles.forFeed]}>
        <Image source={require('../../../../../assets/gifs/icons8-círculo-de-carga.gif')} style={styles.loadinggif} />
    </View>
    
    ) : props.whatPage == "Comment" ? (
    <View style={[styles.loadingbox, styles.forComment]}>
        <Image source={require('../../../../../assets/gifs/icons8-círculo-de-carga.gif')} style={styles.loadinggif} />
    </View>
    ) : (
        <View></View>
    )}
    </>
    )
}

const {styles} = StyleSheet.create ({
    loadingbox: {
        justifyContent: "center",
        alignItems: "center"
    },
    loadinggif: {
        width: 100,
        height: 100,
    },
    forFeed: {
        width: wp(100),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO CARREGAMENTO CABER NA TELA
        height: hp(82),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO CARREGAMENTO CABER NA TELA
    },
    forComment: {
        width: wp(100),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO CARREGAMENTO CABER NA TELA
        height: hp(40),     //MUDE ISSO CASO QUEIRA FAZER O NEGOCIO DO CARREGAMENTO CABER NA TELA
    }
})

export default LoadingBox;