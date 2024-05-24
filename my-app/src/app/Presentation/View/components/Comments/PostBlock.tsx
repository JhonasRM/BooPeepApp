import { useQuery } from "@tanstack/react-query";
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import ContainerOptions from "../ContainerOptions";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Entypo } from '@expo/vector-icons';


const PostBlock = ({postId}: any) => {
    return (
        <View style={styles.container}>
            
            
            <View style={styles.feedblock}>
                <View style={{flexDirection: "row", flexWrap: "nowrap"}}>
                    <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} 
                    style={styles.user}/>

                    <View>
                        <Text style={styles.usertext}>Augusto{/*{item.UserID}*/}</Text>
                        <Text style={styles.userinfo}>2°Lógistica - Noite {/*{item.}*/}</Text>
                    </View>

                    <ContainerOptions style={styles.options}/>
                </View>
                
                 <Text style={[styles.titletext, styles.beyondfirstline]}>
                    Perdi o meu Relogio :( {/*{item.}*/}
                 </Text>
                 <Text style={[styles.infotext, styles.beyondfirstline]}> 
                    O meu relogio ele é feito de aluminio, tem um LED daora e toca até musiquinha. Perdi ele lá
                    na sala de aula 10, alguém poderia me informar aonde ele está? :(
                    {/*item.description*/}
                 </Text>

                <View style={styles.middleline}>
                    <Image source={require('../../../../../../assets/pictures/riff.jpg')} style={styles.missingpic} />
                    <Image source={require('../../../../../../assets/pictures/riff.jpg')} style={styles.missingpic} />
                </View>

               <View style={styles.endline}>
                    <View style={[styles.status, {marginHorizontal: wp(2)}]}>
                    {/* { item.status == "0" ? (
                    <Entypo name="dot-single" size={50} color="green" style={{margin: -15}} />
                    ) : item.status == "1" ? (
                    <Entypo name="dot-single" size={50} color="yellow" style={{margin: -15}} />
                    ) : item.status == "2" ? (
                    <Entypo name="dot-single" size={50} color="red" style={{margin: -15}} />
                    ) : (
                    <Entypo name="dot-single" size={50} color="grey" style={{margin: -15}} />
                    )} */}
                    <Text>Status: 2</Text>
                    </View>

                    <View style={{marginHorizontal: wp(2)}}>
                        <Text>Criado em: 10/30/2010 11:32</Text>
                    </View>
                </View>
            </View>
            )
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        marginVertical: hp(1),
        paddingBottom: hp(2),

        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    feedblock: {
        backgroundColor: "#eeeeee",
        padding: 6,
        borderRadius: 10,
    },
    firstline: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    },
    beyondfirstline: {
        marginLeft: wp(7),
        marginRight: wp(2),
    },
    user: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    usertext: {
        fontWeight: "bold",
        marginLeft: wp(1)
    },
    userinfo: {
      marginLeft: wp(1)
    },
    options: {
        position: "absolute",
        right: 0,  
        marginRight: 10,
        zIndex: 2,
        //backgroundColor: "#dbdbdb",
        borderRadius: 5,
    },
    titletext: {
        paddingHorizontal: wp(5),
        paddingTop: wp(2),
        fontSize: 18,
        fontWeight: "bold"
    },
    infotext: {
        paddingHorizontal: wp(5),
    },
    missingpic: {
        width: 140,
        height: 140,
        marginTop: hp(2),
        marginBottom: hp(2),
        paddingHorizontal: wp(5),
        marginHorizontal: wp(1),
        
    },
    middleline: {
        flexDirection: "row",
        justifyContent: "center"
    },
    status: {
        // borderWidth: wp(2),
        // borderRadius: 50,
        // width: wp(1),
        // height: hp(1),
        // borderColor: "#ce1e1e",
        // marginRight: wp(1),
        flexDirection: "row",
        alignItems: "center",
    },
    time: {
        marginLeft: 4,
    },
    chaticon: {     
        position: "absolute",
        right: 0,
        paddingBottom: 10,
        marginRight: 10,
    },
    endline: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
})

export default PostBlock