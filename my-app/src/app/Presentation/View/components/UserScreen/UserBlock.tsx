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

type UserBlockProps = {
    postsID: string[],
    user: User
}

const UserBlock = (props: UserBlockProps) => {
    const { handleFetchUserPosts } = userBlockStateController();
    const [data, setData] = useState<Post[]>([]);
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erroFetch, setErroFetch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetchData is running");
            console.log(props.postsID);
            try {
                setLoading(true);
                const getPosts = await handleFetchUserPosts(props.postsID);
                if (getPosts.val === false) {
                    setErro(true);
                    throw new Error(getPosts.erro as string);
                }
                const postData: Post[] = getPosts.data as Post[];
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

        // Verifica se postsID contém valores válidos
        const validPostIDs = props.postsID.filter(id => id.trim() !== "");
        if (validPostIDs.length > 0) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [props.postsID]);

    if (loading) {
        <LoadingBox whatPage="Comment" />
    }

    if (erro) {
        return <ErrorMessage message={erroFetch} />;
    }

    if (props.postsID.length === 0 || props.postsID.every(id => id.trim() === "")) {
        return (
            <View style={styles.noPostsContainer}>
                <Text style={styles.noPostsText}>Você não possui nenhuma postagem</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {data.map((item: Post) => (
                <View style={styles.userblock} key={item.postId}>
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
                        {item.description}
                    </Text>
                    <View style={styles.middleline}>
                        <ImageCarousel ImgSource={['']} />
                    </View>
                    <View style={styles.endline}>
                        <View style={[styles.status, { marginHorizontal: wp(2) }]}>
                            {item.status === 0 ? (
                                <Entypo name="dot-single" size={50} color="green" style={{ margin: -15 }} />
                            ) : item.status === 1 ? (
                                <Entypo name="dot-single" size={50} color="yellow" style={{ margin: -15 }} />
                            ) : item.status === 2 ? (
                                <Entypo name="dot-single" size={50} color="red" style={{ margin: -15 }} />
                            ) : (
                                <Entypo name="dot-single" size={50} color="grey" style={{ margin: -15 }} />
                            )}
                            <Text>Status: {item.status}</Text>
                        </View>
                        <View style={{ marginHorizontal: wp(2) }}>
                            <Text>Criado em: {item.createdAt.toString()}</Text>
                        </View>
                        <CommentButton btnStyle={styles.chaticon} postID={item.postId} user={props.user} />
                    </View>
                </View>
            ))}
        </View>
    );
}

const { styles } = StyleSheet.create({
    container: {
        marginVertical: hp(1),
        paddingBottom: hp(2),
        borderBottomColor: "black",
        borderBottomWidth: 2,
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

export default UserBlock;
