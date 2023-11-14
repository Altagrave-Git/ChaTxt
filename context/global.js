import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initial = {

}

export const GlobalState = ({children}) => {
  const [globalState, setGlobalState] = useState();
}