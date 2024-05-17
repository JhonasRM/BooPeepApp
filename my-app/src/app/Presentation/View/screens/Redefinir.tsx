import { StatusBar } from 'expo-status-bar';
import { Link, router }  from "expo-router";
import { StyleSheet, Text, KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { RedefinirStateController } from '../../Controllers/RedefinirStateController';
import AuthErrorMessage from '../components/AuthErrorMessage';

export default function Redefinir() {
  const {
    password,
    confirmarSenha,
    handleFieldChange,
    handleConfirmarSenhaChange,
    handleRedefinir
  } = RedefinirStateController()

  const [erroC, setErroC] = useState("");
  const [erroD, setErroD] = useState("");
  const [erroE, setErroE] = useState("");
  const [erroReset, setErroReset] = useState('')

  const email = 'jhons@trabalhos.com' // email de exemplo => alterar com a lógica AsyncStorage

  const handlePress = async () => {
    try {
      const redefinir = await handleRedefinir(
        email,
        password,
        confirmarSenha
      );
      if (redefinir.valido === false) {
        throw new Error(redefinir.error as string);
      }
      if (redefinir.valido === true) {
      console.log('Redefinição de senha realizado com sucesso!');
      router.push("./Login")
      }
    } catch (error) {
      console.error("Erro ao realizar redefinir:", error);
      if (error instanceof Error) {
        setErroReset(error.message)
      } else {
        setErroReset('An unknown error occurred')
      }

    }
  };

    return(
        <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
         <Image
         style={{
    
         }}
            source={require('../../../../../assets/icons/2-removebg-preview(2).png')}
         />
         <Text style={styles.label}>Nova Senha:</Text>
         <AuthErrorMessage ErrorMessage={erroC} />
            <TextInput style={styles.input}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={async (password) => {
                  const handle = await handleFieldChange("password", password);
                  if (handle.valido === false) {
                    setErroC(handle.error as string);
                  } else if (handle.valido === true) {
                    setErroC("");
                  }
                }}
         />

        <Text style={styles.label}>Confirmar nova senha:</Text>
        <AuthErrorMessage ErrorMessage={erroD} />
            <TextInput style={styles.input}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={ async(confirmarSenha) => { 
                  const handle = await handleConfirmarSenhaChange(password, confirmarSenha)
                  if (handle.valido === false) {
                    setErroD(handle.error as string);
                  } else if (handle.valido === true) {
                    setErroD("");
                  }
                }}  
         />
         
          <View style={styles.btnSubmit}>
         <TouchableOpacity style={styles.btnRegister} onPress={handlePress}>
            <Text style={styles.submitText}>Trocar Senha</Text>
         </TouchableOpacity>
         </View>
         </View>
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
        justifyContent: 'center',
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
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 30,
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
      }
})