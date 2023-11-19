import { Slot } from "expo-router";
import { SessionProvider } from "../global/session";
import { ThemeProvider } from "../global/theme";

export default Root = () => {

  return (
    <ThemeProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </ThemeProvider>
  );
}