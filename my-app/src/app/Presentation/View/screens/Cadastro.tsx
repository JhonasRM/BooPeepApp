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
import React, { useState } from "react";
import { CadastroStateController } from "../../Controllers/CadastroStateController";

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

  const [erroA, setErroA] = useState('');
  const [erroB, setErroB] = useState("");
  const [erroC, setErroC] = useState("");
  const [erroD, setErroD] = useState("");
  const [erroE, setErroE] = useState("");
  const [erroCadastro, setErroCadastro] = useState('')

  const handlePress = async () => {
    try {
      const cadastro = await handleCadastro(
        nome,
        sobrenome,
        email,
        password,
        confirmarSenha
      );
      if (cadastro.valido === false) {
        throw new Error(cadastro.error as string);
      }
      console.log(`${cadastro.value}. Cadastro realizado com sucesso!`);
      router.push("./Presentation/View/screens/Login")
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);

    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
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
              if (handle.valido === false) {
                setErroA(handle.error as string);
              } else if (handle.valido === true) {
                setErroA("");
              }
            }}
          />
          <Text style={styles.label}>Sobrenome:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            autoCorrect={false}
            onChangeText={async (sobrenome) => {
              const handle = await handleFieldChange("sobrenome", sobrenome);
              if (handle.valido === false) {
                setErroB(handle.error as string);
              } else if (handle.valido === true) {
                setErroB("");
              }
            }}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            autoCorrect={false}
            onChangeText={async (email) => {
              const handle = await handleFieldChange("email", email);
              if (handle.valido === false) {
                setErroC(handle.error as string);
              } else if (handle.valido === true) {
                setErroC("");
              }
            }}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={async (password) => {
              const handle = await handleFieldChange("password", password);
              if (handle.valido === false) {
                setErroD(handle.error as string);
              } else if (handle.valido === true) {
                setErroD("");
              }
            }}
          />

          <Text style={styles.label}>Confirmar Senha:</Text>
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
              if (handle.valido === false) {
                setErroE(handle.error as string);
              } else if (handle.valido === true) {
                setErroE("");
              }
            }}
          />

          <TouchableOpacity style={styles.btnRegister} onPress={handlePress}>
            <Text style={styles.submitText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: "90%",
    // alignItems: 'center',
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    borderColor: "#000",
  },

  btnRegister: {
    backgroundColor: "#7b83ff",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 30,
    borderColor: "#000",
    borderWidth: 2,
    fontWeight: "bold",
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
  },

  label: {
    marginBottom: 5,
    fontSize: 17,
    color: "#fff",
    alignSelf: "flex-start",
  },
});
