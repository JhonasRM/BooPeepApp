import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link, router, useRouter }  from "expo-router";
import { StyleSheet, Text, KeyboardAvoidingView, View, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native';


export default function Login() {
  // Essa é a tela de Login
  return (
    
    <KeyboardAvoidingView style={style.background}>
      <ScrollView contentContainerStyle={style.contentContainer}> 

      <View style={style.containerLogo}>
        <Image
        style={{
          marginTop: 40,
          marginBottom: 40,
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

        
        <TouchableOpacity style={style.btnSubmit} onPress={() => router.push("./Feed")}>
          <Text style={style.submitText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.btnRegister} onPress={() => router.push("./Redefinir")}>

          <Text style={style.registerText}>Recuperar Senha</Text>
  
        </TouchableOpacity>

        <TouchableOpacity style={style.btnGoogle} onPress={() => router.push("./ChatApp")}>
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={require('../../../../../assets/icons/icons8-google-logo-48.png')}
          />
          
          
          <Text style={style.submitGoogle}>Conecter-se com Google</Text>
    
        </TouchableOpacity>
            </View>
        </ScrollView>
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
    position: "relative",
    marginTop: 45,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    width: '90%',
    // alignItems: "center",
    // paddingTop: 28,

    marginTop: 50,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    // height: 45,
    marginBottom: 15,
    // marginTop: 30,
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
    marginTop: 30,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnRegister: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: 'center',
  },
  registerText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  label: {
    marginBottom: 5,
    fontSize: 17,
    color: '#fff',
    width: '90%',
    // alignSelf: "flex-start",    
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
