import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Campos Obrigatórios', 'Preencha o email ou senha!');
    } else {
      const emailUser = await AsyncStorage.getItem('@asyncStorage:emailUser');
      const passUser = await AsyncStorage.getItem('@asyncStorage:passUser');
      if (emailUser === email && passUser === password) {
        Alert.alert('Sucesso✔', 'Usuário logado!');
        setReady(true);
        setTimeout(() => {
          setReady(false);
          navigation.goBack();
        }, 3000);
      } else {
        Alert.alert('Erro❌', 'Usuário incorreto!');
      }
    }
  };

  return (
    // O JSX ou componentes visuais devem ser colocados aqui
    / \__
    (    @\___
    /         O
   /   (_____/
   /_____/   U
  );
};

export default SignIn;
