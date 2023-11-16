import { Stack, Redirect } from "expo-router";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useGlobalState } from "../../context/global";

SplashScreen.preventAutoHideAsync();

export default Layout = () => {
  const { state } = useGlobalState();

  const [fontsLoaded] = useFonts({
    Bold: require('../../assets/fonts/DMSans-Bold.ttf'),
    Medium: require('../../assets/fonts/DMSans-Medium.ttf'),
    Regular: require('../../assets/fonts/DMSans-Regular.ttf'),
    Cute: require('../../assets/fonts/Cute.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      { state.user === null ? (
          <Stack onLayout={onLayoutRootView} />
        ) : (
          <Redirect href={"/"} />
        )
      }
    </>
  );
}
