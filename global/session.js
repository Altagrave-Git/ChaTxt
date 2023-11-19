import { createContext, useContext } from 'react';
import { useStorageState } from "./store";

const AuthContext = createContext();

export function SessionProvider({children}) {
  const [[loadingSession, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (sessionData) => {
          setSession(sessionData);
        },
        signOut: () => setSession(null),
        setTheme: (theme) => {
          themedSession = session;
          themedSession["theme"] = theme;
          setSession(themedSession);
        },
        session,
        loadingSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return context;
}
