import { StatusBar } from 'expo-status-bar';
import { Link, router }  from "expo-router";
import { StyleSheet, Text, KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity, Alert, Pressable, Modal} from 'react-native';
import React, { useState } from 'react';
import { RedefinirStateController } from '../../Controllers/RedefinirStateController';
import ModalComponent from '../components/ModalComponent';


export default function Redefinir() {
  const {
    email,
    handleFieldChange,
    handleResetRequest
  } = RedefinirStateController()

  const [erro, setErro ] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [contentModal, setContentModal] = useState('')

  const handlePress = async() => {
    try {
      if(email === '' || email === undefined){
        throw new Error('Preencha os campos necessários.')
      }
      const resetEmail = await handleResetRequest(email)
      if(resetEmail.val === false){
        throw new Error('Erro ao enviar o email')
      }
      setContentModal('Enviamos um email para você')
      setModalVisible(true)

    } catch (error) {
      if(error instanceof Error){
        setErro(error.message)
      }
      setErro('Erro interno do servidor. Tente novamente mais tarde')
    }
  }
  const handleCloseModal = () => {
    setModalVisible(false)
    setTimeout(() => {
      router.push('./Login')
    }, 10)
  }
    return(
        <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
         <Image
         style={{
    
         }}
            source={require('../../../../../assets/icons/2-removebg-preview(2).png')}
         />
        </View>
         <View style={styles.container}>

         <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input}
                autoCorrect={false}
                onChangeText={async(email) => { 
                  const handle = await handleFieldChange('email', email)
                  if(handle.val === false){
                    setErro(handle.erro as string)
                  }
                }}
         />
          <View style={styles.btnSubmit}>
         <TouchableOpacity style={styles.btnRegister} onPress={handlePress}>
            <Text style={styles.submitText}>Trocar Senha</Text>
         </TouchableOpacity>
         </View>
         </View>
         <ModalComponent Category={"Single Action"} isVisible={modalVisible} content={contentModal} onPress={handleCloseModal}/>
         </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
      background: {
        flex: 1,
        backgroundColor: '#400096',
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerLogo: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: "relative"
      },
      container: {
        flex: 1,
        justifyContent: "center",
        width: '90%',
        alignItems: "center"
      },
      input: {
        backgroundColor: '#fff',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#000'
      },
      label: {
        marginBottom: 5,
        fontSize: 17,
        color: '#fff',
        // alignSelf: 'flex-start',
        width: '90%'
      },
      btnRegister: {
        backgroundColor: '#7b83ff',
        width: 300,
        height: 55,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        marginBottom: 70,
        marginTop: 70,
        borderColor: '#000',
        borderWidth: 2,
        fontWeight: 'bold',
      },
      submitText: {
        color: '#fff',
        fontSize: 18,
      },
      btnSubmit: {
        alignItems: 'center',
        justifyContent: "center"
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#7b83ff',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})