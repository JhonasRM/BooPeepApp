import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";
import { useQuery } from "@tanstack/react-query";
import LoadingBox from "../LoadingIcon";
import ErrorMessage from "../ErrorMessage";
import ContainerOptions from "../ContainerOptions";

//import React from "react";


import CommentButton from "../CommentButton";
import ImageCarousel from "../ImageCarousel";
import { Entypo } from '@expo/vector-icons';
import React, { SetStateAction, useEffect, useState } from "react";
import { feedStateController } from "../../../Controllers/feedStateController";
import { Post } from "../../../../Service/Entities/postEntities";

const photos: string[] = ['https://picsum.photos/500/300',
'https://picsum.photos/501/300',
'https://picsum.photos/502/300',
'https://picsum.photos/503/300']

export function FeedQuery() {
    const {
        createdAt, 
        UserID, 
        description, 
        postId, 
        local, 
        status, 
        handleFeedFetch
    } = feedStateController()

    const [data, setData] = useState<Post[] | undefined>([])
    const [erro, setErro] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const [erroFetch, setErroFetch] = useState("")

    useEffect(() => {
        console.log("useEffect is running")

    const incomingData = async () => {
        console.log("incomingData is running")

        try {
            const response = await handleFeedFetch()

            if (response.valido === false) {
                throw new Error(response.erro as string);
            }

            if (response.valido === true) {
                console.log(`${response.value}. GET realizado com sucesso!`);

                setData(response.data)                
                console.log(`Data from setData: ${data}`)
            }

        } catch (error) {
            console.error("Erro ao realizar requisição:", error);
            if (error instanceof Error) {
                setErroFetch(error.message)
            } else {
                setErroFetch('An unknown error occurred')
            }
        }
    }
    incomingData()
    console.log(`FeedBlock Response: ${data}`)
    console.log(`typeof data: ${typeof data}`)
    }, []);

    return (
        <>
        <View style={styles.container}>
            {data && data.map((item: any) => (
                <View style={styles.feedblock}>
                    <View style={{flexDirection: "row", flexWrap: "nowrap"}}>
                        <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} 
                        style={styles.user}/>

                        <View>
                            <Text style={styles.usertext}>{item.UserID}</Text>
                            <Text style={styles.userinfo}>2°Lógistica - Noite {/*{item.}*/}</Text>
                        </View>

                        <ContainerOptions style={styles.options}/>
                    </View>
                    
                    <Text style={[styles.titletext]}>
                        Perdi o meu Relogio :( {/*{item.}*/}
                    </Text>
                    <Text style={[styles.infotext]}> 
                        {item.description}
                    </Text>

                    <View style={styles.middleline}>
                        <ImageCarousel ImgSource={photos}/>
                    </View>

                <View style={styles.endline}>
                        <View style={[styles.status, {marginHorizontal: wp(2)}]}>
                        { item.status == "0" ? (
                        <Entypo name="dot-single" size={50} color="green" style={{margin: -15}} />
                        ) : item.status == "1" ? (
                        <Entypo name="dot-single" size={50} color="yellow" style={{margin: -15}} />
                        ) : item.status == "2" ? (
                        <Entypo name="dot-single" size={50} color="red" style={{margin: -15}} />
                        ) : (
                        <Entypo name="dot-single" size={50} color="grey" style={{margin: -15}} />
                        )} 
                        <Text>Status: {item.status}</Text>
                        </View>

                        <View style={{marginHorizontal: wp(2)}}>
                            <Text>Criado em: {item.createdAt}</Text>
                        </View>

                        <CommentButton btnStyle={styles.chaticon} />
                    </View>
                </View>
                )
            )
            } 
        </View>
        </>
    )
}

const FeedBlock = () => {
    return (
        <View style={styles.container}>
            <FeedQuery />
        </View>
    )
}

const {styles} = StyleSheet.create ({
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
        marginBottom: hp(3),
        marginHorizontal: wp(3)
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
        justifyContent: "center",
        marginVertical: hp(2)
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
        marginBottom: hp(1)
    },
})



export default FeedBlock;