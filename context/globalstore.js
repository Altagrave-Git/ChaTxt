import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useCallback, useReducer } from "react";


export const setStorageItemAsync = async (key, value) => {
  if (Platform === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.log('Local storage is unavailable:', e);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}