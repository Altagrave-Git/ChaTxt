import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useCallback, useReducer } from "react";


const initial = [true, undefined];

const reducer = (state, action = null) => [false, action];

const useAsyncState = (key) => {
  return useReducer(reducer, initial);
}

export const setStoreItemAsync = async (key, value) => {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export const useStorageState = (key) => {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== undefined) {
          const storageItem = localStorage.getItem(key);
          setState(storageItem ? JSON.parse(storageItem) : null)
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value ? JSON.parse(value) : null);
      })
    }
  }, [key]);

  const setValue = useCallback((value) => {
    setStoreItemAsync(key, JSON.stringify(value)).then(() => {
      setState(value);
    })
  }, [key]);

  return [state, setValue];
}