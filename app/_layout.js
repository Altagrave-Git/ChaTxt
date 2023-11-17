import { Slot } from "expo-router";
import { SessionProvider } from "../global/session";

export default Root = () => {

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}