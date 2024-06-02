import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const searchOnStorage = async (key: string): Promise<{val: boolean, info?: any, erro?: string }> => {
  try {
    const info = await AsyncStorage.getItem(`@asyncStorage:${key}`);
    if (info === null || info === undefined) {
      throw new Error('A informação não existe');
    }
    return { val:true, info: info };
  } catch (error) {
    if(error instanceof Error){
      return { val: false, erro: error.message  }
    }
    console.log(error);
    return { val: false, erro: `Erro interno do aplicativo: ${error}` };
  }
};


export { searchOnStorage};
