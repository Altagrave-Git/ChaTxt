import { Slot } from "expo-router";
import { SessionProvider, ThemeProvider, APIProvider } from "../global";

export default Root = () => {

  return (
      <SessionProvider>
          <ThemeProvider>
            <APIProvider>
              <Slot />
            </APIProvider>
        </ThemeProvider>
      </SessionProvider>
  );
}