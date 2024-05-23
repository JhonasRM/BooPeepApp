import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const searchOnStorage = async (key: string): Promise<{ info?: any, erro?: string | Error | unknown }> => {
  try {
    const info = await AsyncStorage.getItem(`@asyncStorage:${key}`);
    if (info === null || info === undefined) {
      throw new Error('A informação não existe');
    }
    return { info: info };
  } catch (error) {
    console.log(error);
    return { erro: error };
  }
};

const removeItemFromStorage = async (key: string): Promise<{ sucesso?: boolean, erro?: string | Error | unknown }> => {
  try {
    await AsyncStorage.removeItem(`@asyncStorage:${key}`);
    return { sucesso: true };
  } catch (error) {
    console.log(error);
    return { erro: error };
  }
};

export { searchOnStorage, removeItemFromStorage };
