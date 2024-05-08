import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";
import { useQuery } from "@tanstack/react-query";
import LoadingBox from "../LoadingIcon";
import ErrorMessage from "../ErrorMessage";
import ContainerOptions from "../ContainerOptions";
import React from "react";
import CommentButton from "../CommentButton";
import ImageCarousel from "../ImageCarousel";
import { Entypo } from '@expo/vector-icons';

const fetchFeed = async () => {                                 //Chamar a API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

export function FeedQuery() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['data'],
        queryFn: fetchFeed,
    });

    if (isLoading) {
        return (
            <LoadingBox />
        )
    }

    if (isError && error) {
        return (
            <ErrorMessage message={error.message} />
        )
    }

    return (
        <View>
            {data && data.map(item => (
            <View style={styles.feedblock} key={item.id}>
                <View style={styles.firstline}>
                    <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
                     <Text style={styles.usertext}> {item.userId} </Text>
                     <ContainerOptions style={styles.options}/>
                </View>
                 <Text style={styles.titletext}>
                    {item.userId}
                 </Text>
                 <Text style={styles.infotext}> 
                 {item.body}
                 </Text>

                <View style={styles.middleline}>
                    <ImageCarousel ImgStyle={styles.missingpic} ImgDataset={{media: ids.missingpic}} ImgSource={require('../../../../../../assets/pictures/riff.jpg')}/>
                </View>

               <View style={styles.endline}>
                    { item.title == "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" ? (
                    <Entypo name="dot-single" size={50} color="green" style={{margin: -15}} />
                    ) : item.title == "ea molestias quasi exercitationem repellat qui ipsa sit aut" ? (
                    <Entypo name="dot-single" size={50} color="yellow" style={{margin: -15}} />
                    ) : item.title == "qui est esse" ? (
                    <Entypo name="dot-single" size={50} color="red" style={{margin: -15}} />
                    ) : (
                    <Entypo name="dot-single" size={50} color="grey" style={{margin: -15}} />
                    )}
                    <Text style={styles.statustext}>Status: {item.title}</Text>
                    <CommentButton btnStyle={styles.chaticon} />
                </View>
                <Text style={styles.time}>Há: <>{item.id}</> </Text>
            </View>
            ))
            }
        </View>
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



export default FeedBlock;