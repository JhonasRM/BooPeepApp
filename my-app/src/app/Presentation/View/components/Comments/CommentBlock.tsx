import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ContainerOptions from "../ContainerOptions";
import LoadingBox from "../LoadingIcon";
import { ComentBlockStateController } from "../../../Controllers/ComentBlockStateController";
import { Coment } from "../../../../Service/Entities/comentEntities";
import ErrorMessage from "../ErrorMessage";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";

type ComentBlockProps = {
    postID: string,
}

const CommentBlock = (props: ComentBlockProps) => {
    const { handleFetchComents, createComent } = ComentBlockStateController();
    const [data, setData] = useState<Coment[]>([]);
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erroFetch, setErroFetch] = useState<string>("");
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetchData is running");
            console.log(props.postID);
            try {
                setLoading(true);
                const getPosts: IReturnAdapter = await handleFetchComents(props.postID);
                if (getPosts.val === false) {
                    if (getPosts.erro === 'NotFound' || (typeof getPosts.erro === 'string' && getPosts.erro.includes('404'))) {
                        setData([]);
                    } else {
                        setErro(true);
                        throw new Error(getPosts.erro as string);
                    }
                } else {
                    const postData: Coment[] = getPosts.data as Coment[];
                    setData(postData);
                }
                setLoading(false);
            } catch (error) {
                console.error("Erro ao realizar requisição:", error);
                setErro(true);
                setErroFetch(error instanceof Error ? error.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchData();
    }, [props.postID]);

    const handleInputComent = async () => {
        setLoading(true);
        try {
            const handleCreateComent: IReturnAdapter = await createComent(props.postID, newComment);
            if (handleCreateComent.val === false) {
                throw new Error(handleCreateComent.erro as string);
            }
            console.log('Comentário criado');
            console.log(handleCreateComent.data);
            setNewComment("");
            // Refetch comments after a new one is created
            const getPosts: IReturnAdapter = await handleFetchComents(props.postID);
            if (getPosts.val === false) {
                if (getPosts.erro === 'NotFound' || (typeof getPosts.erro === 'string' && getPosts.erro.includes('404'))) {
                    setData([]);
                } else {
                    setErro(true);
                    throw new Error(getPosts.erro as string);
                }
            } else {
                setData(getPosts.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Erro ao criar comentário:", error);
            setErro(true);
            setErroFetch(error instanceof Error ? error.message : 'Erro interno da aplicação');
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingBox whatPage="Comment" />;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={hp(8)} 
        >
            <View style={styles.container}>
                {erro ? (
                    <ErrorMessage message={erroFetch} />
                ) : (
                    <>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            {data.length === 0 ? (
                                <View style={styles.noCommentsView}>
                                    <Text style={styles.noCommentsText}>Esta postagem não possui comentários</Text>
                                </View>
                            ) : (
                                data.map((item: Coment) => (
                                    <View style={styles.commentblock} key={item.comentID}>
                                        <View style={styles.firstline}>
                                            <Image source={require('../../../../../../assets/icons/icons8-usuário-homem-com-círculo-100_Feed.png')} style={styles.user} />
                                            <Text style={styles.usertext}> {item.uid} </Text>
                                            <ContainerOptions style={styles.commentoptions} postID={undefined} />
                                        </View>
                                        <View style={[styles.bodyarea, styles.beyonduserpic]}>
                                            <Text>{item.text}</Text>
                                        </View>
                                        <View style={[styles.lastline, styles.beyonduserpic]}>
                                            <Text style={styles.timetext}>Criado em: {item.createdAt.toString()}</Text>
                                        </View>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                    </>
                )}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adicionar um comentário..."
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleInputComent}>
                        <Text style={styles.addButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: hp(8), // Espaço suficiente para o input
    },
    scrollViewContent: {
        paddingBottom: hp(8), // Espaço suficiente para o input
    },
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
        height: 30,
    },
    usertext: {
        fontWeight: "bold",
        fontSize: 15,
    },
    timetext: {
        fontSize: 12,
    },
    noCommentsView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2),
    },
    noCommentsText: {
        fontSize: 16,
        color: '#555',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    addButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
    },
});

export default CommentBlock;
