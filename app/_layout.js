import { Slot } from "expo-router";
import { GlobalStateProvider } from "../context/global";

export default Root = () => {

  return (
    <GlobalStateProvider>
      <Slot />
    </GlobalStateProvider>
  );
}