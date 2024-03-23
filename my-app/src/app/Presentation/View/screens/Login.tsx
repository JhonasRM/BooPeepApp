import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link }  from "expo-router";
import { StyleSheet, Text, KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity} from 'react-native';


export default function Login() {
  // Essa é a tela de Login
  return (
    <KeyboardAvoidingView style={style.background}>
      <View style={style.containerLogo}>
        <Image
        style={{
          width: 450,
          height:153
        }}
          source={require('../../../../../assets/icons/2-removebg-preview(2).png')}
        />
      </View>
      
      <View style={style.container}>
      <Text style={style.label}>Email:</Text> 
        <TextInput
          style={style.input}
          placeholder=""
          autoCorrect={false}
          onChangeText={() => { }}
        />
        <Text style={style.label}>Senha:</Text>
        <TextInput
          style={style.input}
          placeholder=""
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity style={style.btnSubmit}>
          <Link href={"./Feed"}>
          <Text style={style.submitText}>Entrar</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={style.btnRegister}>
        <Link href={"/Redefinir"}>
          <Text style={style.registerText}>Recuperar Senha</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={style.btnGoogle}>
          <Image
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
            }}
            source={require('../../../../../assets/icons/icons8-google-logo-48.png')}
          />
          
          <Link href={"./ChatApp"}>
          <Text style={style.submitGoogle}>Conecter-se com Google</Text>
          </Link>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  );
};

const style = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#400096',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: '90%',
    alignItems: "center"
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#000000",
    
  },

  btnSubmit: {
    backgroundColor: "#7b83ff",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  label: {
    marginBottom: 5,
    fontSize: 17,
    color: '#fff',
    alignSelf: "flex-start",    
  },
  btnGoogle: {
    backgroundColor: '#fff',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#000000",
  },

  submitGoogle: {
    color: "#400096",
    fontWeight: "bold",
    marginLeft: 18, 
  }
});
