import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";
import { useQuery } from "@tanstack/react-query";
import LoadingBox from "../LoadingIcon";
import ErrorMessage from "../ErrorMessage";

//import React from "react";


import CommentButton from "../CommentButton";
import ImageCarousel from "../ImageCarousel";
import { Entypo } from '@expo/vector-icons';
import React, { SetStateAction, useEffect, useState } from "react";
import { PostsFeed, feedStateController } from "../../../Controllers/feedStateController";
import { Post } from "../../../../Service/Entities/postEntities";
import ContainerOptions from "../ContainerOptions";

const photos: string[] = [
 'https://picsum.photos/500/300',
 'https://picsum.photos/501/300',
 'https://picsum.photos/502/300',
 'https://picsum.photos/503/300'
]

type Props = {
    isTouched?: any
    pressedEdit?: any
    stopEdit?: any
}

export function FeedQuery(props: Props) {
    const {
        posts,
        handleFeedFetch
    } = feedStateController()

    const [erro, setErro] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const [erroFetch, setErroFetch] = useState("")

    useEffect(() => {
        console.log("useEffect is running")

    const incomingData = async () => {
        console.log("incomingData is running")

        try {
            setLoading(true)
            const response = await handleFeedFetch()

            if (response.val === false) {
                throw new Error(response.erro as string);
            }

            if (response.val === true) {
                console.log(`${response.data}. GET realizado com sucesso!`);
                console.log(`Data from setData: ${posts}`)
            }

        } catch (error) {
            console.error("Erro ao realizar requisição:", error);
            if (error instanceof Error) {
                setErroFetch(error.message)
            } else {
                setErroFetch('An unknown error occurred')
            }
            setErro(true)

        }
        finally {
            setLoading(false)
        }
    }
    incomingData()
    console.log(`FeedBlock Response: ${posts}`)
    console.log(`erro Response: ${erro}`)
    }, []);

    const handleContainerOptionsEditResponse = (response: any) => {
        props.isTouched(response)
    }

    return (
        <>
        <View style={styles.container}>
            { loading ? (
                <>
                    <LoadingBox whatPage="Feed" />
                </>
            ) : erro ? (
                <>
                    <ErrorMessage message={erroFetch}/>
                </>
            ) : (
            <>
            {posts && posts.map((item: PostsFeed) => (
                <View style={styles.feedblock}>
                    <View style={{flexDirection: "row", flexWrap: "nowrap"}}>
                        <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} 
                        style={styles.user}/>

                        <View>
                            <Text style={styles.usertext}>{item.name} {item.nickname}</Text>
                            <Text style={styles.userinfo}>{item.course} - {item.shift}</Text>
                        </View>

                        <ContainerOptions style={styles.options} isTouched={handleContainerOptionsEditResponse} pressedEdit={props.pressedEdit} stopEdit={props.stopEdit}/>
                    </View>
                    
                    <Text style={[styles.titletext]}> 
                        {item.post.description}
                    </Text>

                    <View style={styles.middleline}>
                        <ImageCarousel ImgSource={photos}/>
                    </View>

                <View style={[styles.endline, {marginBottom: 0}]}>
                        <View style={[styles.status, {marginHorizontal: wp(2)}]}>
                        { item.post.status == 0 ? (
                        <Entypo name="dot-single" size={50} color="green" style={{margin: -15}} />
                        ) : item.post.status == 1 ? (
                        <Entypo name="dot-single" size={50} color="yellow" style={{margin: -15}} />
                        ) : item.post.status == 2 ? (
                        <Entypo name="dot-single" size={50} color="red" style={{margin: -15}} />
                        ) : (
                        <Entypo name="dot-single" size={50} color="grey" style={{margin: -15}} />
                        )} 
                        <Text>Status: {item.post.status}</Text>
                        </View>

                        <CommentButton btnStyle={styles.chaticon} />
                    </View>
                    <View style={[styles.endline, {marginHorizontal: wp(2)}]}>
                            <Text>Criado em: {item.post.createdAt.toString()}</Text>
                    </View>
                </View>
                )
            )
            } 
            </>
            )}
        </View>
        </>
    )
}

const FeedBlock = (props: Props) => {
    return (
        <View style={styles.container}>
            <FeedQuery isTouched={props.isTouched} pressedEdit={props.pressedEdit} stopEdit={props.stopEdit}/>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    container: {
        marginTop: hp(1),
        paddingBottom: hp(2),

        // borderBottomColor: "black",
        // borderBottomWidth: 2,
    },
    feedblock: {
        backgroundColor: "#eeeeee",
        padding: 6,
        borderRadius: 10,
        marginBottom: hp(3),
        marginHorizontal: wp(3),
        // borderBottomColor: "black",
        // borderBottomWidth: 2,
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
        fontSize: 16,
        //fontWeight: "bold"
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


export default FeedBlock