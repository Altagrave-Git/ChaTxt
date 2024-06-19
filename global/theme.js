import { createContext, useContext } from 'react';
import { useStorageState } from "./storage";
import { THEMES } from "../constants/theme";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
  const [[loadingTheme, theme], setTheme] = useStorageState('theme');

  return (
    <ThemeContext.Provider
      value={{
        setTheme: (themeChoice) => setTheme(THEMES[themeChoice]),
        theme,
        loadingTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be wrapped in a <ThemeProvider />');
  }
  return context;
}