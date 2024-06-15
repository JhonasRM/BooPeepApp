import { StatusBar } from 'expo-status-bar';
import { Link, router }  from "expo-router";
import { StyleSheet, Text, KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity, Alert, Pressable, Modal} from 'react-native';
import React, { useState } from 'react';
import { RedefinirStateController } from '../../Controllers/RedefinirStateController';
import LoadingBox from '../components/LoadingIcon';
import HeaderBar from '../components/HeaderBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function Redefinir() {
  const {
    email,
    handleFieldChange,
    handleResetRequest
  } = RedefinirStateController()

  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro ] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [contentModal, setContentModal] = useState('')

  const handlePress = async() => {
    try {
      setIsLoading(true);
      if(email === '' || email === undefined){
        throw new Error('Preencha os campos necessários.')
      }
      const resetEmail = await handleResetRequest(email)
      if(resetEmail.val === false){
        throw new Error('Erro ao enviar o email')
      }
      setContentModal('Enviamos um email para você')
      setModalVisible(true)
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      if(error instanceof Error){
        setErro(error.message)
      }
      setErro('Erro interno do servidor. Tente novamente mais tarde')
    }
  }
  const handleConfirm = () => {
    setModalVisible(false)
    setTimeout(() => {
      router.push('./Login')
    }, 10)
  }
    return(
        <KeyboardAvoidingView style={styles.background}>
        {isLoading == false ? (
        <>
        <HeaderBar whatScreen="auth" whatLink="./Login"/>
        <View style={styles.containerLogo}>
         <Image
         style={{
          width: 160,
          height: 220
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
         </View>
         <View style={styles.btnSubmit}>
         <TouchableOpacity style={styles.btnRegister} onPress={handlePress}>
            <Text style={styles.submitText}>Trocar Senha</Text>
         </TouchableOpacity>
         </View>
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{contentModal}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleConfirm}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </>
   ) : (
    <>
      <LoadingBox whatPage='Auth'/>
    </>
   )}
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
        //flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: "relative",
        marginTop: hp(4)
      },
      container: {
        flex: 1,
        justifyContent: "flex-end",
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
        borderColor: '#40009680'
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
        // marginBottom: 70,
        // marginTop: 70,
        borderColor: '#d5d7fe80',
        borderWidth: 2,
        fontWeight: 'bold',
      },
      submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
      },
      btnSubmit: {
        flex: 1,
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