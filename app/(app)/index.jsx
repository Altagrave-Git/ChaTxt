import { View, Text, ScrollView, SafeAreaView, Pressable, ActivityIndicator } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, SIZES, FONT, icons } from "../../constants";
import Svg, { Path } from "react-native-svg";
import Avatar from "../../components/avatar/avatar";
import { useSession } from "../../global/session";
import { useTheme } from "../../global/theme";

const Home = () => {
  const { session } = useSession();
  const { theme } = useTheme();

  const router = useRouter();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.background
    }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: theme.primary, },
        headerShadowVisible: true,
        headerLeft: () => (
          <Text style={{ fontFamily: FONT.cute, fontSize: 40, color: theme.secondary }}>ClubToon</Text>
        ),
        headerRight: () => (
          <Pressable>
            <Svg style={{fill: theme.secondary}} xmlns="http://www.w3.org/2000/svg" height={25} width={20} viewBox="0 0 448 512">
              <Path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"/>
            </Svg>
          </Pressable>
        ),
        headerTitle: ""
      }} />

      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Pressable 
          style={{
            height: 75,
            width: 75,
            borderColor: theme.primary,
            borderStyle: "solid",
            borderWidth: 2,
            borderRadius: 50,
            backgroundColor: COLORS[session.user.color],
            shadowColor: COLORS.black,
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 5
          }} onPress={() => router.push('/login/')}
        >
          <Avatar />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Home;