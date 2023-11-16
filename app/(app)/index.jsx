import { View, Text, ScrollView, SafeAreaView, Pressable, ActivityIndicator } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, SIZES, FONT, icons } from "../../constants";
import Svg, { Path } from "react-native-svg";
import Avatar from "../../components/avatar/avatar";

const Home = () => {

  const router = useRouter();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.gray1
    }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.warning },
        headerShadowVisible: true,
        headerLeft: () => (
          <Text style={{ fontFamily: FONT.cute, fontSize: 40, color: COLORS.orange }}>ClubToon</Text>
        ),
        headerRight: () => (
          <Pressable>
            <Svg style={{fill: COLORS.orange}} xmlns="http://www.w3.org/2000/svg" height={25} width={20} viewBox="0 0 448 512">
              <Path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"/>
            </Svg>
          </Pressable>
        ),
        headerTitle: ""
      }} />

      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Pressable style={{height: 75, width: 75, borderColor: COLORS.warning, borderStyle: "solid", borderWidth: 2, borderRadius: 50,
        backgroundColor: COLORS.danger }} onPress={() => router.push('/login/')}>
          <Avatar />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Home;