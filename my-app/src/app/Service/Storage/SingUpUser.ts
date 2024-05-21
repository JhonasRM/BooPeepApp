import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleCreateUser = async () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Campos Obrigatórios', 'Preencha o nome, email ou senha!');
    } else {
      await AsyncStorage.setItem('@asyncStorage:nameUser', name);
      await AsyncStorage.setItem('@asyncStorage:emailUser', email);
      await AsyncStorage.setItem('@asyncStorage:passUser', password);
      setReady(true);
      setTimeout(() => {
        setReady(false);
        navigation.goBack();
      }, 3000);
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

export default SignUp;
