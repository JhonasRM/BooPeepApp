import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, router, useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LoginStateController } from "../../Controllers/LoginStateController";
import AuthErrorMessage from "../components/AuthErrorMessage";
import { RedefinirStateController } from "../../Controllers/RedefinirStateController";
import LoadingBox from "../components/LoadingIcon";
import HeaderBar from "../components/HeaderBar";

export default function Login() {
  const {
    email,
    password,
    handleFieldChange,
    handleLogin
  } = LoginStateController();

  const [isLoading, setIsLoading] = useState(false);
  const [erroA, setErroA] = useState("");
  const [erroB, setErroB] = useState("");
  const [erroLogin, setErroLogin] = useState("")
  const [erroReset, setErroReset] = useState('')
  let tentativa: number = 0



  const handlePress = async () => {
    try {
      setIsLoading(true);

      const login = await handleLogin(email, password);
      if (login.val === true) {
        tentativa = 0
        router.push("./Feed");
      }
      throw new Error(login.erro as string);

    } catch (error) {
      setIsLoading(false);

      console.error("Erro ao realizar cadastro:", error);
      if (error instanceof Error) {
        setErroLogin(error.message)
      } else {
        setErroLogin('Ocorreu um erro desconnhecido! Tente Novamente')
        tentativa = tentativa + 1
        if (tentativa === 3) {
          setErroLogin('Persiste um erro desconhecido. Estamos contatando o suporte.')
        }
      }
    }
  };

  const handleReset = async () => {
    try {
      router.push('./Redefinir')
    } catch (error) {
      setErroA('Erro interno da aplicação. Tente novamente')
    }
  }

  return (
    <KeyboardAvoidingView style={style.background}>
    { isLoading == false ? (
      <>
        <HeaderBar whatScreen="auth" whatLink="/"/>
        <View style={style.containerLogo}>
          <Image
            style={{
              // marginTop: 40,
              // marginBottom: 40,
              width: 160,
              height: 220
            }}
            source={require("../../../../../assets/icons/2-removebg-preview(2).png")}
          />
        </View>

        <View style={style.container}>
          <Text style={style.label}>Email:</Text>
          <AuthErrorMessage ErrorMessage={erroA} style={{width: '100%'}}/>
          <TextInput
            style={style.input}
            placeholder=""
            autoCorrect={false}
            //11/05/2024
            onChangeText={async (email) => {
              const handle = await handleFieldChange("email", email);
              if (handle.val === false) {
                setErroA(handle.erro as string);
              } else if (handle.val === true) {
                setErroA("");
              }

            }}
          />
          <Text style={style.label}>Senha:</Text>
          <AuthErrorMessage ErrorMessage={erroB} style={{width: '100%'}}/>
          <TextInput
            style={style.input}
            placeholder=""
            secureTextEntry={true}
            autoCorrect={false}
            //11/05/2024
            onChangeText={async (password) => {
              const handle = await handleFieldChange("password", password);
              if (handle.val === false) {
                setErroB(handle.erro as string);
              } else if (handle.val === true) {
                setErroB("");
              }
            }}
          />
        </View>
        
        <View style={style.submitContainer}> 
          <View style={style.submitView}>
            <AuthErrorMessage ErrorMessage={erroLogin}  />
            <TouchableOpacity style={style.btnSubmit} onPress={handlePress}>
              <Text style={style.submitText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={style.btnRegister}
            onPress={handleReset}
          >
            <Text style={style.registerText}>Recuperar Senha</Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
    <>
      <LoadingBox whatPage="Auth" />
    </>
  )}
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#400096",

  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //position: "relative",
    //marginTop: hp(10),

  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    alignItems: "center",
    // paddingTop: 28,
    marginTop: 50,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    // height: 45,
    marginBottom: 15,
    // marginTop: 30,
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#40009680",
  },
  submitView: {
    //marginTop: 20,
  },
  btnSubmit: {
    backgroundColor: "#7b83ff",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d5d7fe80",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnRegister: {
    marginTop: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  registerText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  label: {
    marginBottom: 5,
    fontSize: 17,
    color: "#fff",
    width: "100%",
    // alignSelf: "flex-start",
  },
  submitContainer: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    //alignItems: "center",
    //marginTop: hp(10)
  },
  // btnGoogle: {
  //   backgroundColor: "#fff",
  //   width: "100%",
  //   height: 45,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 10,
  //   marginTop: 40,
  //   flexDirection: "row",
  //   borderWidth: 2,
  //   borderColor: "#40009680",
  // },
  // submitGoogle: {
  //   color: "#400096",
  //   fontWeight: "bold",
  //   marginLeft: 18,
  // },

});
