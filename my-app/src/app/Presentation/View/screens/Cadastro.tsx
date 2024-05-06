import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export default function Cadastro() {
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
         source={require('../../../../../assets/icons/2-removebg-preview(2).png')}
        />
      </View>

      <View style={styles.container} >
      <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder=''
          autoCorrect={false}
          onChangeText={() => {  }}
        />

      <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          placeholder=''
          autoCorrect={false}
          onChangeText={() => {  }}
        />

      <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder=''
          autoCorrect={false}
          onChangeText={() => {  }}
        />

      <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder=''
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={() => {  }}
        />

      <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder=''
          secureTextEntry={true}
          autoCorrect={false}
          onChangeText={() => {  }}
        />

      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.submitText}>Cadastrar</Text>
      </TouchableOpacity>


      </View>
      </ScrollView>
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
    // justifyContent: 'center',
    width: '90%',
    // alignItems: 'center',

  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000'
  },

  btnRegister: {
    backgroundColor: '#7b83ff',
    width: '100%',
    height: 45,
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

  label: {
    marginBottom: 5,
    fontSize: 17,
    color: '#fff',
    alignSelf: 'flex-start'
  }
});
