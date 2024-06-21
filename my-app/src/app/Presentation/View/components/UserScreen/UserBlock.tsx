import { Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from 'react-native-media-query';
import { ids } from "./UserBlockResponsivity";
import { useQuery } from "@tanstack/react-query";
import LoadingBox from "../LoadingIcon";
import ErrorMessage from "../ErrorMessage";
import ContainerOptions from "../ContainerOptions";
import CommentButton from "../CommentButton";
import ImageCarousel from "../ImageCarousel";
import { Entypo } from '@expo/vector-icons';
import React, { SetStateAction, useEffect, useState } from "react";
import { feedStateController } from "../../../Controllers/feedStateController";
import { Post } from "../../../../Service/Entities/postEntities";
import { userBlockStateController } from "../../../Controllers/userBlockStateController";
import { UserScreenStateController } from "../../../Controllers/UserScreenStateController";

const photos: string[] = ['https://picsum.photos/500/300',
'https://picsum.photos/501/300',
'https://picsum.photos/502/300',
'https://picsum.photos/503/300']

type UserBlockProps = {
    postsID: string[]
}

const UserBlock = (props: UserBlockProps) => {
    const { handleFetchUserPosts } = userBlockStateController();
    const [data, setData] = useState<Post[]>([]);
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [erroFetch, setErroFetch] = useState("");

    useEffect(() => {
        const incomingData = async () => {
            console.log("incomingData is running");
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
            } catch (error) {
                console.error("Erro ao realizar requisição:", error);
                if (error instanceof Error) {
                    setErroFetch(error.message);
                } else {
                    setErroFetch('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        incomingData();
    }, [props.postsID]);
    useEffect(() => {
        console.log(data)
        if (data.length !== 0|| erro) {
            setIsDataFetched(true);
        }
    }, [data]);
    if(isDataFetched === false){
        return(
            <Text>Nenhuma postagem foi encontrada</Text>
        )
    }
    return (
        <UserBlockComponent posts={data} erro={erro} loading={loading} erroFetch={`${erroFetch}`}/>
    )
}


type UserBlockComponentProps = {
    posts: Post[];
    erro: boolean;
    loading: boolean;
    erroFetch: string;
};

const UserBlockComponent: React.FC<UserBlockComponentProps> = ({ posts, erro, loading, erroFetch }) => {
    if (loading) {
        return <LoadingBox whatPage="Comment" />;
    }

    if (erro) {
        return <ErrorMessage message={erroFetch} />;
    }
    if(posts){
        console.log(posts)
    }

    return (
        <View style={styles.container}>
            {posts.map((item: Post) => (
                <View style={styles.userblock} key={item.postId}>
                    <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
                        <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')}
                            style={styles.user} />
                        <ContainerOptions style={styles.options} />
                    </View>
                    <Text style={styles.titletext}>
                        Perdi o meu Relogio :( {/*{item.title}*/}
                    </Text>
                    <Text style={styles.infotext}>
                        {item.description}
                    </Text>
                    <View style={styles.middleline}>
                        <ImageCarousel ImgSource={photos} />
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
                            <Text>Criado em: {new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                        <CommentButton btnStyle={styles.chaticon} />
                    </View>
                </View>
            ))}
        </View>
    );
}


const {styles} = StyleSheet.create ({
    container: {
        marginVertical: hp(1),
        paddingBottom: hp(2),

        borderBottomColor: "black",
        borderBottomWidth: 2,
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

export default UserBlock