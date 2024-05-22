import React from "react"
import LoadingBox from "../LoadingIcon";
import ErrorMessage from "../ErrorMessage";
import { Image, StyleSheet, Text, View } from "react-native";
import ContainerOptions from "../ContainerOptions";
import ImageCarousel from "../ImageCarousel";
import CommentButton from "../CommentButton";
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ids } from "./UserBlockResponsivity";
import userPostsController from "../../../Controllers/userPostsController";

//VERIFICAR A API, ENTÃO VER SE ELE SÓ PEGA OS POSTS DO USUÁRIO
const UserBlock = ({UserId}: any) => {
    const {data, isError, error, isLoading} = userPostsController(UserId);

    if (isLoading) {
        <LoadingBox whatPage="Feed" />
    }

    if (isError) {
        <ErrorMessage message={error} />
    }

    return (
        <>
            {data && data.map((item: any) => (  //Conversar com o Jonathan referente ao Warning
            <View style={styles.feedblock} key={item.postId}>
                <View style={styles.firstline}>
                    <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
                     <Text style={styles.usertext}> {item.UserID} </Text>
                     <ContainerOptions style={styles.options}/>
                </View>
                 <Text style={styles.titletext}>
                    {item.local}
                 </Text>
                 <Text style={styles.infotext}> 
                 {item.description}
                 </Text>

                <View style={styles.middleline}>
                    <ImageCarousel ImgStyle={styles.missingpic} ImgDataset={{media: ids.missingpic}} ImgSource={require('../../../../../../assets/pictures/riff.jpg')}/>
                </View>

               <View style={styles.endline}>
                    { item.status == "0" ? (
                    <Entypo name="dot-single" size={50} color="green" style={{margin: -15}} />
                    ) : item.status == "1" ? (
                    <Entypo name="dot-single" size={50} color="yellow" style={{margin: -15}} />
                    ) : item.status == "2" ? (
                    <Entypo name="dot-single" size={50} color="red" style={{margin: -15}} />
                    ) : (
                    <Entypo name="dot-single" size={50} color="grey" style={{margin: -15}} />
                    )}
                    <Text style={styles.statustext}>Status: {item.status}</Text>
                    <CommentButton btnStyle={styles.chaticon} />
                </View>
                <Text style={styles.time}>Criado em: {item.createdAt}</Text>
            </View>
            ))
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    feedblock: {
        backgroundColor: "#ffffff",
        marginHorizontal: wp(5),
        marginVertical: hp(2),
        padding: 6,
        borderRadius: 10
    },
    firstline: {
        flexDirection: "row",
    },
    user: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    usertext: {
        fontWeight: "bold",
    },
    options: {
        position: "absolute",
        right: 0,  
        marginRight: 10,
        zIndex: 1,
        //backgroundColor: "#dbdbdb",
        borderRadius: 5,
    },
    titletext: {
        paddingHorizontal: wp(5),
        paddingTop: wp(2),
        fontSize: 18,
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
        justifyContent: "center",
        marginVertical: hp(1),
        marginHorizontal: wp(2),
    },
    status: {
        borderWidth: wp(2),
        borderRadius: 50,
        width: wp(1),
        height: hp(1),
        borderColor: "#ce1e1e",
        marginRight: wp(1),
    },
    statustext: {
        marginRight: wp(18),
    },
    time: {
        marginLeft: 10,
    },
    chaticon: {
        width: 35,
        height: 35,        
        position: "absolute",
        right: 0,
        paddingBottom: 10,
        marginRight: 10,
    },
    endline: {
        flexDirection: "row",
        marginLeft: 10,
    },
})

export default UserBlock