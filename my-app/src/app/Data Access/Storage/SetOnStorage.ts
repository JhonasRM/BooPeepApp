import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


  const SetOnStorage = async (key: string, info: any): Promise<{val: boolean, erro?: string}> => {
    try {
      await AsyncStorage.setItem(`@asyncStorage:${key}`, info );
      return { val: true }
    } catch (error) {
      if(error instanceof Error){
        console.log(error.message)
        return { val: false, erro:  error.message}
      }
      return { val:false, erro: `Erro interno do aplicativo: ${error}`}
    }       
    }


export default SetOnStorage;
