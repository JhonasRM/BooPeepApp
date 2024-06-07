import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { CadastroStateController } from "../../Controllers/CadastroStateController";
import AuthErrorMessage from "../components/AuthErrorMessage";
import LoadingBox from "../components/LoadingIcon";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Cadastro() {
  const {
    nome,
    sobrenome,
    email,
    password,
    confirmarSenha,
    handleFieldChange,
    handleConfirmarSenhaChange,
    handleCadastro,
  } = CadastroStateController();

  const [isLoading, setIsLoading] = useState(false);
  const [erroC, setErroC] = useState("");
  const [erroD, setErroD] = useState("");
  const [erroE, setErroE] = useState("");
  const [erroCadastro, setErroCadastro] = useState('')

  const handlePress = async () => {
    try {
      setIsLoading(true);
      const cadastro = await handleCadastro(
        nome,
        sobrenome,
        email,
        password,
        confirmarSenha
      );
      
      if (cadastro.val === false) {
        throw new Error(cadastro.erro as string);
      }
      if (cadastro.val === true) {
      console.log(` Cadastro realizado com sucesso!`);
      router.push("./Login")
      }
      
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao realizar cadastro:", error);
      if (error instanceof Error) {
        setErroCadastro(error.message)
      } else {
        setErroCadastro('An unknown error occurred')
      }

    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      {isLoading == false ? (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.containerLogo}>
          <Image
            style={{
              // width: 100,
              // height: 100,
              marginTop: 40,
              marginBottom: 40,
            }}
            source={require("../../../../../assets/icons/2-removebg-preview(2).png")}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Nome:</Text>
          
          <TextInput
            style={styles.input}
            placeholder=""
            autoCorrect={false}
            onChangeText={async (nome) => {
              const handle = await handleFieldChange("nome", nome);
            }}
          />

          <Text style={styles.label}>Sobrenome:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            autoCorrect={false}
            onChangeText={async (sobrenome) => {
              const handle = await handleFieldChange("sobrenome", sobrenome);
            }}
          />

          <Text style={styles.label}>Email:</Text>
          <AuthErrorMessage ErrorMessage={erroC} />
          <TextInput
            style={styles.input}
            placeholder=""
            autoCorrect={false}
            onChangeText={async (email) => {
              const handle = await handleFieldChange("email", email);
              if (handle.val === false) {
                setErroC(handle.erro as string);
              } else if (handle.val === true) {
                setErroC("");
              }
            }}
          />

          <Text style={styles.label}>Senha:</Text>
          <AuthErrorMessage ErrorMessage={erroD} />
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={async (password) => {
              const handle = await handleFieldChange("password", password);
              if (handle.val === false) {
                setErroD(handle.erro as string);
              } else if (handle.val === true) {
                setErroD("");
              }
            }}
          />

          <Text style={styles.label}>Confirmar Senha:</Text>
          <AuthErrorMessage ErrorMessage={erroE} />
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={async (confirmarSenha) => {
              const handle = await handleConfirmarSenhaChange(
                password,
                confirmarSenha
              );
              if (handle.val === false) {
                setErroE(handle.erro as string);
              } else if (handle.val === true) {
                setErroE("");
              }
            }}
          />

          <View style={styles.registerView}>
            <AuthErrorMessage ErrorMessage={erroCadastro}/>
            <TouchableOpacity style={styles.btnRegister} onPress={handlePress}>
              <Text style={styles.submitText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      ) : (
        <>
          <LoadingBox whatPage="Auth"/>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#400096",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    width: "80%",
    // alignItems: 'center',
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(100)
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#40009680",
  },
  registerView: {
    marginTop: 30,
    marginBottom: 30,
  },
  btnRegister: {
    backgroundColor: "#7b83ff",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "#d5d7fe80",
    borderWidth: 2,
    fontWeight: "bold",
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  },

  label: {
    marginBottom: 5,
    fontSize: 17,
    color: "#fff",
    alignSelf: "flex-start",
  },
});
