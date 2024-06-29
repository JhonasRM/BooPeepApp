
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { Entypo } from '@expo/vector-icons';
import { userBlockStateController } from "../../../Controllers/userBlockStateController";
import ErrorMessage from "../ErrorMessage";
import ContainerOptions from "../ContainerOptions";
import CommentButton from "../CommentButton";
import ImageCarousel from "../ImageCarousel";
import { Post } from "../../../../Service/Entities/postEntities";
import { User } from "../../../../Service/Entities/userEntities";
import LoadingBox from "../LoadingIcon";
import { PostBlockStateController } from "../../../Controllers/PostBlockStateController";
import { ListItem } from "tamagui";

type PostBlockProps = {
    //ISSO ERA DO FEEDBLOCK
    isTouched?: any
    pressedEdit?: any
    stopEdit?: any
    postId?: any
    reloadGET?: any
    reloadResponse?: any

    //ISSO É DO POSTBLOCK
    postID: string,
    post?: Post,
    user: User
}

const PostBlock = (props: PostBlockProps) => {
    const { handleFetchPost, loggedUser } = PostBlockStateController();
    const [data, setData] = useState<Post>();
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erroFetch, setErroFetch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetchData is running");
            console.log(props.postID);
            try {
                setLoading(true);
                const getPosts = await handleFetchPost(props.postID);
                if (getPosts.val === false) {
                    setErro(true);
                    throw new Error(getPosts.erro as string);
                }
                const postData: Post = getPosts.data as Post;
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
        setLoading(false)
    }, [props.postID]);

    const handleContainerOptionsEditResponse = (response: any) => {
        props.isTouched(response)
    }

    if (loading) {
        <LoadingBox whatPage="Comment" />
    }

    if (erro) {
        return <ErrorMessage message={erroFetch} />;
    }

    if (props.postID === '') {
        return (
            <View style={styles.noPostsContainer}>
                <Text style={styles.noPostsText}>Nenhuma Postagem Selecionada</Text>
            </View>
        );
    }

    if(props.post){
        return (
            <View style={styles.container}>
                    <View style={styles.userblock} key={props.post.postId}>
                        <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
                            <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')}
                                style={styles.user} />
                            <View>
                                <Text style={styles.usertext}>{props.user.name} {props.user.nickname}</Text>
                                <Text style={styles.userinfo}>{props.user.course} - {props.user.shift}</Text>
                            </View>

                            { props.post.UserID === loggedUser ? (
                            <ContainerOptions style={styles.options} isTouched={handleContainerOptionsEditResponse} pressedEdit={props.pressedEdit} stopEdit={props.stopEdit} postID={props.post.postId} />
                            ) : (null)
                            }

                        </View>
                        <Text style={styles.infotext}>
                            {props.post.description}
                        </Text>
                        <View style={styles.middleline}>
                            <ImageCarousel ImgSource={['']} />
                        </View>
                        <View style={styles.endline}>
                            <View style={[styles.status, { marginHorizontal: wp(2) }]}>
                                {props.post.status === 0 ? (
                                    <>
                                    <Entypo name="dot-single" size={50} color="red" style={{ margin: -15 }} />
                                    <Text>Status: Perdido</Text>
                                    </>
                                ) : props.post.status === 1 ? (
                                    <>
                                    <Entypo name="dot-single" size={50} color="yellow" style={{ margin: -15 }} />
                                    <Text>Status: Achado</Text>
                                    </>
                                ) : props.post.status === 2 ? (
                                    <>
                                    <Entypo name="dot-single" size={50} color="green" style={{ margin: -15 }} />
                                    <Text>Status: Devolvido</Text>
                                    </>
                                ) : (
                                    <Entypo name="dot-single" size={50} color="grey" style={{ margin: -15 }} />
                                )}
                            </View>
                            <View style={{ marginHorizontal: wp(2) }}>
                                <Text>Criado em: {props.post.createdAt.toString()}</Text>
                            </View>
                            <CommentButton btnStyle={styles.chaticon} postID={props.postID} user={props.user} />
                        </View>
                    </View>
            </View>
        );
    } else {

    return (
        <View style={styles.container}>
                <View style={styles.userblock} key={data?.postId}>
                    <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
                        <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')}
                            style={styles.user} />
                        <View>
                            <Text style={styles.usertext}>{props.user.name} {props.user.nickname}</Text>
                            <Text style={styles.userinfo}>{props.user.course} - {props.user.shift}</Text>
                        </View>
                        <ContainerOptions style={styles.options} postID={undefined} />
                    </View>
                    <Text style={styles.infotext}>
                        {data?.description}
                    </Text>
                    <View style={styles.middleline}>
                        <ImageCarousel ImgSource={['']} />
                    </View>
                    <View style={styles.endline}>
                        <View style={[styles.status, { marginHorizontal: wp(2) }]}>
                            {data?.status === 0 ? (
                                <Entypo name="dot-single" size={50} color="red" style={{ margin: -15 }} />
                            ) : data?.status === 1 ? (
                                <Entypo name="dot-single" size={50} color="yellow" style={{ margin: -15 }} />
                            ) : data?.status === 2 ? (
                                <Entypo name="dot-single" size={50} color="green" style={{ margin: -15 }} />
                            ) : (
                                <Entypo name="dot-single" size={50} color="grey" style={{ margin: -15 }} />
                            )}
                            <Text>Status: {data?.status}</Text>
                        </View>
                        <View style={{ marginHorizontal: wp(2) }}>
                            <Text>Criado em: {data?.createdAt.toString()}</Text>
                        </View>
                        <CommentButton btnStyle={styles.chaticon} postID={props.postID} user={props.user} />
                    </View>
                </View>
        </View>
    );
}
}

const { styles } = StyleSheet.create({
    container: {
        marginVertical: hp(1),
        paddingBottom: hp(2),
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    noPostsText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    userblock: {
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
});

export default PostBlock;