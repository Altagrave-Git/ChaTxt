import { Slot } from "expo-router";
import { SessionProvider, ThemeProvider } from "../global";

export default Root = () => {

  return (
    <SessionProvider>
        <ThemeProvider>
          <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}