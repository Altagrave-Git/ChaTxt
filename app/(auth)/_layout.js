import { Stack, Redirect } from "expo-router";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSession, useTheme } from "../../global";

SplashScreen.preventAutoHideAsync();

export default Layout = () => {
  const { session, loadingSession } = useSession();
  const { theme, loadingTheme, setTheme } = useTheme();

  const [fontsLoaded] = useFonts({
    Bold: require('../../assets/fonts/DMSans-Bold.ttf'),
    Medium: require('../../assets/fonts/DMSans-Medium.ttf'),
    Regular: require('../../assets/fonts/DMSans-Regular.ttf'),
    Cute: require('../../assets/fonts/Cute.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !loadingTheme && !loadingSession)
    await SplashScreen.hideAsync();
  }, [fontsLoaded, loadingTheme, loadingSession]);

  if (theme === null) {
    setTheme('default');
  }

  if (!fontsLoaded || loadingTheme || loadingSession) {
    return null;
  }

  return !session ? (
    <Stack screenOptions={{contentStyle: {backgroundColor: theme.background}}} onLayout={onLayoutRootView} />
  ) : session.user.is_new ? (
    <Redirect href={"/tutorial/"} />
  ) : (
    <Redirect href={"/"} />
  )
}