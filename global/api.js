import { createContext, useContext } from "react";
import ToonAPI from "../api/api";
import { useSession } from "./session";

const APIContext = createContext();

export function APIProvider({children}) {
  const { session } = useSession();

  return (
    <APIContext.Provider
      value={{
        get: async (path, params={}) => await ToonAPI.get(path, params, session?.token),
        post: async (path, body={}, contentType=null) => await ToonAPI.post(path, body, contentType, session?.token)
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be wrapped in a <APIProvider />');
  }
  return context;
}