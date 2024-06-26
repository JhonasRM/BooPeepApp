import React, { useEffect } from "react"
import { useState } from "react"
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle, Modal, Pressable } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { containerOptionsStateController } from "../../Controllers/containerOptionsStateController";

interface Props {
    style?: StyleProp<ViewStyle> //"Isso será usado para receber o estilo do Parent!" - Bolt
    isTouched?: any
    pressedEdit?: any
    stopEdit?: any
    postID: any
}

const ContainerOptions = (props: Props) => {
    const {DeletePost} = containerOptionsStateController()

    const [isPress, setIsPress] = useState(false)
    const [pressEdit, setPressEdit] = useState(false)

    const handlePress = () => {
        setIsPress(true)
    }

   const handleExit = () => {
	    setIsPress(false)
   }

   const handlePostFormEditDenial = (response: any) => {
        props.stopEdit(response)
   }

   //veja isso
   const EditHandle = () => {    
        //props.pressedEdit = pressEdit

        //props.isTouched(true)
        props.pressedEdit(true)
        handlePostFormEditDenial
   }

   

   const DeleteHandle = async() => {
        try {
            const deletePost = await DeletePost(props.postID)
            if (deletePost.val === false) {
                throw new Error(deletePost.erro as string)
            }
        } catch (error) {
            console.log(`DeleteHandle respondeu com ERRO! ${error}`)
        }
        console.log(`Post tentando ser deletado: ${props.postID}`)
   }

   useEffect(() => {
        if (props.stopEdit == true) {
            props.pressedEdit(false)
        }
   })

    //if/else based on click boolean
    //Will open a menu and hide the icon image

    return (
        <>
        { isPress == false ? (
        <TouchableOpacity style={props.style} onPress={handlePress}>
            <Image source={require('../../../../../assets/icons/icons8-menu-2-24.png')}/>
        </TouchableOpacity>
        ) : (
        <Modal onRequestClose={handleExit} animationType="slide" transparent={true}>
            <TouchableOpacity onPress={handleExit} style={styles.outsideModal} activeOpacity={0}>
                <Text />
            </TouchableOpacity>

            <View style={styles.modal}>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={handleExit} style={styles.exitBtn}>
                        <Image source={require("../../../../../assets/icons/icons8-fechar-janela-100.png")} 
                        style={styles.exitBtnImg}/>
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Opções da Postagem</Text>
                </View>

                <TouchableOpacity style={styles.optioncontainer} onPress={EditHandle}> 
                    <Image source={require('../../../../../assets/icons/icons8-menu-2-24.png')} style={styles.btnImg}/>
                    <Text style={[styles.btnText]}>Editar Postagem</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optioncontainer} onPress={DeleteHandle}>
                    <Image source={require('../../../../../assets/icons/icons8-menu-2-24.png')} style={styles.btnImg}/>
                    <Text style={[styles.btnText, {color: "red"}]}>Deletar Postagem</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        )}
        </>
    )
}

//IMPORTANTE: SUBSTITUIR TUDO QUE ENVOLVE O "styles.optionsmenu" COM OS BOTÕES DO "UserConfigProps"

const styles = StyleSheet.create({
    optionsmenu: {
        borderRadius: 5,
        backgroundColor: "#d4d7ff",
        paddingVertical: 2,
    },
    modal: {
        backgroundColor: "#FFF", 
        position: "absolute", 
        bottom: 0, left: 0, right: 0, top: hp(50),
    },
    outsideModal: {   
        backgroundColor: "#00000080",
        position: "absolute",
        top: 0, bottom: 0, left: 0, right: 0
    },
    optioncontainer: {
        paddingVertical: 14,
        paddingLeft: 10,

        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#888888",
        borderBottomWidth: 2,
    },
    btnImg: {
        
    },
    btnText: {
        fontWeight: "bold"
    },

    //Header Bar
    headerBar: {
        backgroundColor: "#d4d7ff",
        borderBottomColor: "#888888",
        borderBottomWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 5,
    },
    exitBtn: {

    },
    exitBtnImg: {
        width: 40,
        height: 40,
    },
    headerText: {
        marginLeft: wp(2),
        fontSize: 19,
        fontWeight: "bold"
    }
})

export default ContainerOptions