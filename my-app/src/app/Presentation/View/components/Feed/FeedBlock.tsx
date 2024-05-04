import { Text, View, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./FeedBlockResponsivity";
import LoadingBox from "../LoadingIcon";
import ErrorMessage from "../ErrorMessage";
import ContainerOptions from "../ContainerOptions";
import React from "react";
import CommentButton from "../CommentButton";
import ImageCarousel from "../ImageCarousel";
import feedController from "../../../Controllers/feedController";

export function FeedQuery() {
    const { data, isLoading, isError, error } = feedController();

    if (isLoading) {
        return (
            <LoadingBox whatPage="Feed"/>
        )
    }

    if (isError && error) {
        return (
            <ErrorMessage message={error.message} />
        )
    }

    return (
        <View>
            {data && data.map((item: any) => (
            <View style={styles.feedblock} key={item.postId}>
                <View style={styles.firstline}>
                    <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
                     <Text style={styles.usertext}> {/*item.userId*/} User </Text>
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
                   <View style={styles.status} dataSet={{media: ids.status}}/>
                    <Text style={styles.statustext}>Status: 
                        {item.status == 0 ? (<>Perdido</>) : 
                        item.status == 1 ? (<>Achado</>) :
                        item.status == 2 ? (<>Devolvido</>) :
                        (<></>)}
                    </Text>
                    <CommentButton btnStyle={styles.chaticon} />
                </View>
                <Text style={styles.time}>Há: <>{item.createdAt}</> </Text>
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