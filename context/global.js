import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initial = {
  user: null,
  theme: 'default'
}

const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload }

    case "theme":
      return { ...state, theme: action.payload }

    default:
      return state;
  }
}

export const GlobalStateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider')
  }
  return context;
}