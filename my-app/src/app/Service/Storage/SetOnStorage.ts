import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


  const SetOnStorage = async (key: string, info: any) => {
    try {
      await AsyncStorage.setItem(`@asyncStorage:${key}`, info );
    } catch (error) {
      console.log (error)
    }       
    }


export default SetOnStorage;
