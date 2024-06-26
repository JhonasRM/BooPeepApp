import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ContainerOptions from "../ContainerOptions";
import LoadingBox from "../LoadingIcon";
import { User } from "../../../../Service/Entities/userEntities";
import { ComentBlockStateController } from "../../../Controllers/ComentBlockStateController";
import { Coment } from "../../../../Service/Entities/comentEntities";
import ErrorMessage from "../ErrorMessage";

type ComentBlockProps = {
    postID: string,
    user: User
}

const CommentBlock = (props: ComentBlockProps) => {
    const { handleFetchUserPosts } = ComentBlockStateController();
    const [data, setData] = useState<Coment[]>([]);
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erroFetch, setErroFetch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetchData is running");
            console.log(props.postID);
            try {
                setLoading(true);
                const getPosts = await handleFetchUserPosts(props.postID);
                if (getPosts.val === false) {
                    setErro(true);
                    throw new Error(getPosts.erro as string);
                }
                const postData: Coment[] = getPosts.data as Coment[];
                setData(postData);
                setLoading(false);

            } catch (error) {
                console.error("Erro ao realizar requisição:", error);
                if (error instanceof Error) {
                    setErroFetch(error.message);
                } else {
                    setErroFetch('An unknown error occurred');
                }
                setLoading(false);
            }
        };

            fetchData();
            setLoading(false);
    }, [props.postID]);

    if (loading) {
        <LoadingBox whatPage="Comment" />
    }

    if (erro) {
        return <ErrorMessage message={erroFetch} />;
    }

    
    return ( 
        <>
             {data && data.map((item: Coment) => (
            <View style={styles.commentblock} key={item.comentID}>
                <View style={styles.firstline}>
                    <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user}/>
                    <Text style={styles.usertext}> {item.uid} </Text>
                    <ContainerOptions style={styles.commentoptions} postID={undefined}/>
                </View>

                <View style={[styles.bodyarea, styles.beyonduserpic]}>
                    <Text>{item.text}</Text>
                </View>

                <View style={[styles.lastline, styles.beyonduserpic]}>
                    <Text style={styles.timetext}>Criado em: {item.createdAt.toString()}</Text>
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