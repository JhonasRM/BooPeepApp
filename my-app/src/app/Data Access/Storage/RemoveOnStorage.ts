import AsyncStorage from "@react-native-async-storage/async-storage";

const removeItemFromStorage = async (key: string): Promise<{ val: boolean, erro?: string }> => {
    try {
      await AsyncStorage.removeItem(`@asyncStorage:${key}`);
      return { val: true };
    } catch (error) {
      console.log(error);
      if(error instanceof Error){
        console.log(error.message)
        return { val: false, erro: error.message}
      }
      return { val: false, erro: `Erro interno do aplicativo: ${error}`}
    }
  };

  export { removeItemFromStorage }