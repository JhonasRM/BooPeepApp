import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FeedBlock from "./Feed/FeedBlock";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { createPostStateController } from "../../Controllers/createPostStateController";
import { AntDesign } from '@expo/vector-icons';
import { GetOnStorage } from "../../../Data Access/Storage/GetOnStorage";
import ContainerOptions from "./ContainerOptions";
import { Post } from "../../../Service/Entities/postEntities";
import { feedStateController } from "../../Controllers/feedStateController";
import { User } from "../../../Service/Entities/userEntities";
import {Picker} from '@react-native-picker/picker';

type Props = {
    isTouched?: any
    pressedEdit?: any
    stopEdit?: any
    postId: any
    reloadGET: any
    reloadResponse: any
}

const CreatePost = (props: Props) => {
    const {
        description,
        local,
        handleFieldChange,
        //handleCheckDescriptionChange,
        handleCreatePost,
        UpdatePost
    } = createPostStateController()
    
    const [erroA, setErroA] = useState("");
    const [erroB, setErroB] = useState("");
    const [erroCreatePost, setErroCreatePost] = useState('')
    const [useEffectRunner, setUseEffectRunner] = useState<any>(undefined)

    const [isTouched, setIsTouched] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const [editPressed, wasEditPressed] = useState<boolean | null>(props.pressedEdit)
    const [startEdit, isEditStarting] = useState<boolean | null>(false)
    const [selectedLanguage, setSelectedLanguage] = useState();

    const [postData, setPostData] = useState({
        UserID: "",
        description: "",
        local: ""
    });

    const handleTouch = () => {
        setIsTouched(true)
    }

    const handleExit = () => {
        props.stopEdit(true)
        setIsTouched(false)

        isEditStarting(false)
    }

    const imageHandler = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSendPost = async () => {
        try {
            
        const getUid = await GetOnStorage('uid')
        const uid = getUid.info as string
            const createPost = await handleCreatePost(
                //title,
                uid,
                description,
                local
            )

            if (createPost.valido === false) {
                throw new Error(createPost.erro as string)
            }

            if (createPost.valido === true) {
                console.log(`${createPost.value}. Postagem criada com sucesso!`);
                handleExit()
            }
        }

        catch (error) {
            console.error("Erro ao criar postagem:", error);
            if (error instanceof Error) {
              setErroCreatePost(error.message)
            } else {
              setErroCreatePost('An unknown error occurred')
            }
        }

        console.log(erroB);
    }

    const handlePostChange = (name: any, value: any) => {
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        console.log(postData);
    };

    const handleUpdate = async () => {
        console.log("Dados do post atualizados:", postData);
        const newPost = new Post (
            postData.UserID, postData.description, postData.local
        )

        //post, newPost, props.postID
        const updatePost = await UpdatePost("ble3jZht5ruroAflmDRA", newPost);
        console.log(`postId: ${props.postId}`)
        if (updatePost.val === false) {
            setErroCreatePost(updatePost.erro as string);
            console.log(`handleUpdate respondeu com ERRO! ${erroCreatePost}`)
        } else if (updatePost.val === true) {
            console.log("handleUpdate respondeu com SUCESSO!")
            handleExit()
            props.reloadGET(true)
        }
    }

    useEffect(() => {
        console.log(props.pressedEdit)

        if (props.pressedEdit == true) {
            isEditStarting(true)
            setIsTouched(true)
        }

        if (props.reloadResponse == true) {
            props.reloadGET(false)
        }
    })

    useEffect(() => { //"Previne que abra o Modal duas vezes" - Bolt
        props.stopEdit(true)
    }, [])

    return (
    <>
    {/* <GrandfatherPostFormIsTouchedHandler isTouched={updateTouched} /> */}
    {/* <ContainerOptions isTouched={updateTouched}/> */}
    { isTouched == false ? (
        <>
        <TouchableOpacity style={styles.buttonOn} onPress={handleTouch}>
            <AntDesign name="plus" size={35} color="white" />
        </TouchableOpacity>
        </>
    ) : (
        <>
        <Modal onRequestClose={handleExit} animationType="slide" transparent={true}>
            <TouchableOpacity onPress={handleExit} style={styles.outsideModal} activeOpacity={0}>
                <Text />
            </TouchableOpacity>

            <KeyboardAvoidingView behavior="padding" style={styles.containerOn}>
            <View style={styles.formOn}>
                <TouchableWithoutFeedback>
                    <ScrollView keyboardShouldPersistTaps={"handled"}>
                    <View style={styles.topView}>
                        <FontAwesome name="user-circle" size={40} color="black" style={{marginBottom: -40}} />

                        <TouchableOpacity style={styles.exitbutton} onPress={handleExit}>
                            <MaterialCommunityIcons name="exit-to-app" size={40} color="#400096" />
                        </TouchableOpacity>
                    </View>

                { isTouched == true && editPressed == false ? (
                    <View style={styles.inputView}>
                        {/* <TextInput 
                        placeholder={"Título da postagem"} 
                        placeholderTextColor={"#303030"}
                        autoCorrect={false}
                        // onChangeText={async (title) => {
                        //     const handle = await handleFieldChange("nome", nome);
                        //      if (handle.valido === false) {
                        //          setErroA(handle.erro as string);
                        //      } else if (handle.valido === true) {
                        //          setErroA("")
                        //      }
                        //}}
                        style={styles.textInput}
                        />  */}

                        <TextInput 
                        placeholder={"Me diga o que ocorreu..."} 
                        placeholderTextColor={"#303030"}
                        multiline
                        numberOfLines={10}
                        autoCorrect={false}
                        onChangeText={async (description) => {
                            const handle = await handleFieldChange("description", description)
                            if (handle.valido === false) {
                                setErroB(handle.erro as string);
                            } else if (handle.valido === true) {
                                setErroB("")
                            }
                        }}
                        style={styles.textInput}
                        />
                    </View>
                ) : isTouched == true && startEdit == true ? (
                    <View style={styles.inputView}>
                    {/* <TextInput 
                    placeholder={"Título da postagem"} 
                    placeholderTextColor={"#303030"}
                    autoCorrect={false}
                    // onChangeText={async (title) => {
                    //     const handle = await handleFieldChange("nome", nome);
                    //      if (handle.valido === false) {
                    //          setErroA(handle.erro as string);
                    //      } else if (handle.valido === true) {
                    //          setErroA("")
                    //      }
                    //}}
                    style={styles.textInput}
                    />  */}

                    <TextInput 
                    placeholder={postData.description} 
                    placeholderTextColor={"#303030"}
                    multiline
                    numberOfLines={9}
                    autoCorrect={false}
                    onChangeText={(text: any) => {
                        handlePostChange("description", text)
                    }}
                    style={styles.textInput}
                    />

                    </View>
                ) : (null)
                }

                <View>
                    { startEdit == true ? (
                    <>
                    <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }
                    style={styles.selectPicker}>
                        <Picker.Item label="Perdido" value={0} />
                        <Picker.Item label="Achado" value={1} />
                        <Picker.Item label="Devolvido" value={2} />
                    </Picker>
                    </>
                    ): (null)}
                </View>

                    <View style={styles.buttonView}>
                        { startEdit == true ? (
                        <>                   
                        <TouchableOpacity onPress={handleUpdate} style={styles.postbtn}>
                            <Text style={styles.btntext}>Alterar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imagebutton} onPress={imageHandler}>
                            <MaterialCommunityIcons name="image-filter-hdr" size={40} color="#400096" />
                        </TouchableOpacity>
                        </>
                        ) : editPressed == false ? (
                        <>
                        <TouchableOpacity onPress={handleSendPost} style={styles.postbtn}>
                            <Text style={styles.btntext}>Publicar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imagebutton} onPress={imageHandler}>
                            <MaterialCommunityIcons name="image-filter-hdr" size={40} color="#400096" />
                        </TouchableOpacity>
                        </>
                        ) : (null)}
                    </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
            </KeyboardAvoidingView>
        </Modal>
        </>
    )
    }
    </>
    )
}

const styles = StyleSheet.create ({
    outsideModal: {   
        backgroundColor: "#00000080",
        position: "absolute",
        top: 0, bottom: 0, left: 0, right: 0
    },
    containerOn: {        //<View>
        backgroundColor: "#ffffff",
        flex: 1,
        position: "absolute",
        right: 0,
        left: 0,
        top: hp(40),     //"MUDE ISSO CASO SAIA QUEBRADO EM OUTROS TAMANHOS" - Bolt
        bottom: 0,   //"ISSO ESTAVA ME ENGANANDO COM O TRECO DO SCROLLVIEW DO TEXTINPUT BRUH" - Bolt
        borderTopStartRadius: 30,
    },
    containerOff: {
        flex: 1,
        position: "absolute",
        right: 0,
        bottom: hp(0.1),
    },
    buttonOn: {          //<TouchableOpacity>
        backgroundColor: "#000000",
        width: wp(18),
        height: hp(9),
        marginRight: 15,
        borderRadius: 5,
        position: "absolute",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        right: 0,
        bottom: hp(10),
        
        display: "flex"     //"Isso irá mostrar o botão."
    },
    buttonOff: {
        display: "none"
    },
    plustext: {     //<Text>
         fontSize: 50,         
         color: "#ffffff",
        // position: "absolute",
        // top: 0, bottom: 0
    },
    formOn: {
        display: "flex",
        marginTop: hp(3),
        marginHorizontal: wp(4),
    },
    formOff: {
        display: "none"
    },
    topView: {
        flexDirection: "row",
        alignItems: "center"
    },
    labeltext: {
        fontSize: 30,
        marginBottom: hp(2),
        marginRight: wp(38),

        borderBottomWidth: 3,
        borderRadius: 5,
        borderBottomColor: "#000", //Precisa do isDark useState
    },
    inputView: {
        marginTop: hp(7),
        marginBottom: hp(2.5)
    },
    textInput: {
        backgroundColor: "#d4d7ff", //Precisa do isDark useState
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        marginVertical: hp(1),
        textAlignVertical: "top",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        fontSize: 15,
        textAlign: "justify",
    },
    buttonView: {
        marginBottom: hp(2),
        marginRight: wp(2)
    },
    imagebutton: {
        position: "absolute",
        bottom: 0,
        right: wp(27),
        height: 40,
        width: 40,
        paddingTop: 1,
    },
    imageimg: {
        width: 37,
        height: 37,
    },
    postbtn: {
        backgroundColor: "#400096",
        borderRadius: 10,

        marginLeft: wp(68),
        paddingVertical: hp(1),
    },
    btntext: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold"
    },
    exitbutton: {
        position: "absolute",
        top: 0,
        right: 0,
        height: 40,
        width: 40,
    },
    exitimg: {
        width: 40,
        height: 40,
    },
    selectPicker: {
        backgroundColor: '#d4d7ff', 
        marginBottom: 20,
    },
    selectContainer: {
        borderRadius: 2
    }
})

export default CreatePost