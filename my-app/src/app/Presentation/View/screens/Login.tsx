import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, router, useRouter } from "expo-router";
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

export default function Login() {
  const { 
    email, 
    password, 
    handleFieldChange, 
    handleLogin 
  } = LoginStateController();

  //11/05/2024
  const [erroA, setErroA] = useState("");
  const [erroB, setErroB] = useState("");
  const [erroLogin, setErroLogin] = useState("")
  //end

  const handlePress = async () => {
    try {
      const login = await handleLogin(email, password);
      if (login.valido === false) {
        throw new Error(login.error as string);
      }
      console.log(`${login.value}. Login realizado com sucesso!`);
      router.push("./Feed");
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      if (error instanceof Error) {
        setErroLogin(error.message)
      } else {
        setErroLogin('An unknown error occurred')
      }
    }
  };

  return (
    <KeyboardAvoidingView style={style.background}>
      <ScrollView contentContainerStyle={style.contentContainer}>
        <View style={style.containerLogo}>
          <Image
            style={{
              marginTop: 40,
              marginBottom: 40,
            }}
            source={require("../../../../../assets/icons/2-removebg-preview(2).png")}
          />
        </View>

        <View style={style.container}>
          <Text style={style.label}>Email:</Text>
          {/* 11/05/2024 */}
          <AuthErrorMessage ErrorMessage={erroA} />
          {/* end */}
          <TextInput
            style={style.input}
            placeholder=""
            autoCorrect={false}
            //11/05/2024
            onChangeText={async (email) => {
              const handle = await handleFieldChange("email", email);
              if (handle.valido === false) {
                setErroA(handle.error as string);
              } else if (handle.valido === true) {
                setErroA("");
              }
            //end
            }}
          />
          <Text style={style.label}>Senha:</Text>
          {/* 11/05/2024 */}
          <AuthErrorMessage ErrorMessage={erroB} />
          {/* end */}
          <TextInput
            style={style.input}
            placeholder=""
            secureTextEntry={true}
            autoCorrect={false}
            //11/05/2024
            onChangeText={async (password) => {
              const handle = await handleFieldChange("password", password);
              if (handle.valido === false) {
                setErroB(handle.error as string);
              } else if (handle.valido === true) {
                setErroB("");
              }
            //end
            }}
          />

          <View style={style.submitView}>
            <AuthErrorMessage ErrorMessage={erroLogin} />
            <TouchableOpacity style={style.btnSubmit} onPress={handlePress}>
              <Text style={style.submitText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={style.btnRegister}
            onPress={() => router.push("./Redefinir")}
          >
            <Text style={style.registerText}>Recuperar Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.btnGoogle}
            onPress={() => router.push("./ChatApp")}
          >
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={require("../../../../../assets/icons/icons8-google-logo-48.png")}
            />

            <Text style={style.submitGoogle}>Conecter-se com Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    position: "relative",
    marginTop: 45,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    width: "90%",
    // alignItems: "center",
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
    borderColor: "#000000",
  },
  submitView: {
    marginTop: 20,
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
    alignItems: "center",
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
    width: "90%",
    // alignSelf: "flex-start",
  },
  btnGoogle: {
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
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
  },
});
