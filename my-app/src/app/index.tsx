import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity, StyleSheet
} from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function App() {
  

  return (
    
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Image
            style={{
              width: 480,
              height: 330,
            }}
            source={require('../../assets/icons/3-removebg-preview.png')}
          />
          
        </View>

        <View style={styles.container}>
        
          <TouchableOpacity style={styles.btnSubmit} onPress={() => router.push("./Presentation/View/screens/Login")}>
    
              <Text style={styles.submitText}>Entrar</Text>
    
          </TouchableOpacity>
          

          
          <TouchableOpacity  style={styles.btnSubmit2} onPress={() => router.push("./Presentation/View/screens/Cadastro")}>
              <Text style={styles.submitText2}>Registrar-se</Text>
          </TouchableOpacity>
          
        </View>
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
  container: {
    flex: 1,
    backgroundColor: "#400096",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },
  btnSubmit: {
    backgroundColor: "#7b83ff",
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
    marginTop: 120,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnSubmit2: {
    backgroundColor: "#fff",
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
    marginTop: 20,
  },

  submitText2: {
    color: "#400096",
    fontSize: 18,
    fontWeight: "bold",
  },
});
