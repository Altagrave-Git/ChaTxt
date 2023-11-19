import { Stack, Redirect } from "expo-router";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSession } from "../../global/session";
import { useTheme } from "../../global/theme";

SplashScreen.preventAutoHideAsync();

export default Layout = () => {
  const { session, isLoading } = useSession();
  const { theme, setTheme } = useTheme();

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

  if (theme === null) {
    setTheme('default');
  }

  return (
    <>
      { session === null ? (
          <Stack onLayout={onLayoutRootView} />
        ) : (
          <Redirect href={"/"} />
        )
      }
    </>
  );
}
