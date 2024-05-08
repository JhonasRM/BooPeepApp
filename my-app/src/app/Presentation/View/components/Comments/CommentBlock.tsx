import { useQuery } from "@tanstack/react-query";
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ContainerOptions from "../ContainerOptions";
import LoadingBox from "../LoadingIcon";

const CommentBlock = () => {
    const fetchComments = async () => {                                 //Chamar a API
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        return response.json();
    }

    // const fetchUsers = async () => {    //"Vamos precisar disso para exibir o nome/status no .firstline"
    //     const response = await fetch ('https://jsonplaceholder.typicode.com/users');
    //     return response.json();
    // }

    const {data, isLoading} = useQuery({
        queryKey: ['CommentsData'],
        queryFn: fetchComments
    })

    if (isLoading) {
        return (
            <LoadingBox whatPage="Comment" />
        )
    }
    
    return ( //FAZER O QUERY AQUI
        <>
             {data && data.map((item: any) => (
            <View style={styles.commentblock} key={item.id}>
                <View style={styles.firstline}>
                    <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
                    <Text style={styles.usertext}> {item.email} </Text>
                    <ContainerOptions style={styles.commentoptions}/>
                </View>

                <View style={[styles.bodyarea, styles.beyonduserpic]}>
                    <Text>{item.body}</Text>
                </View>

                <View style={[styles.lastline, styles.beyonduserpic]}>
                    <Text style={styles.timetext}>Criado em: {item.id}</Text>
                    <TouchableOpacity style={styles.commentbtn}>
                        <Image source={require('../../../../../../assets/icons/icons8-mensagens-100_Feed.png')} style={styles.commentimg}/>
                    </TouchableOpacity>
                </View>
            </View>
             ))}
        </>
    )
}

const styles = StyleSheet.create ({
    commentblock: {
        borderRadius: 7,
        
        backgroundColor: "#d4d7ff",

        paddingHorizontal: wp(2),
        paddingVertical: hp(1.5),
        marginHorizontal: wp(5),
        marginVertical: hp(1),
    },
    user: {
        width: 30,
        height: 30,
    },
    firstline: {
        flexDirection: "row",
        zIndex: 2,
    },
    commentoptions: {
        position: "absolute",
        right: 0,
    },
    beyonduserpic: {
        marginLeft: wp(7),
        marginRight: wp(2),
    },
    bodyarea: {
        zIndex: 1,
    },
    lastline: {
        marginTop: hp(0.5),
        paddingVertical: hp(0.8),
    },
    commentbtn: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    commentimg: {
        width: 30,
        height: 30
    },
    usertext: {
        fontWeight: "bold",
        fontSize: 15,
    },
    timetext: {
        fontSize: 12,
    },
})

export default CommentBlock