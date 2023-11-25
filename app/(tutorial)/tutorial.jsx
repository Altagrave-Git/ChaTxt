import { useSession } from "../../global/session";
import { useTheme } from "../../global/theme"
import { SafeAreaView, View, Text, ScrollView, Pressable } from "react-native";
import { Stack } from "expo-router";
import { PressableOpacity } from "../../components/common";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";
import { Avatar, adjustColor } from "../../components/avatar";
import { Foundation } from "@expo/vector-icons";
import { BedroomA, BedroomB } from "../../components/background/bedroom";


const TutorialView = () => {
  const { theme } = useTheme();
  const { session } = useSession();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.background
    }}>
      {/* HEADER */}
      <Stack.Screen options={{
        headerStyle: { backgroundColor: theme.primary },
        headerShadowVisible: true,
        headerLeft: () => <Text style={{ fontFamily: FONT.cute, fontSize: SIZES.xxLarge, color: theme.highlight }}>Tutorial</Text>,
        headerRight: () => (
          <PressableOpacity onPress={() => router.push("/register/")}>
            <Text style={{ fontFamily: FONT.cute, fontSize: SIZES.xxLarge, color: theme.secondary }}>Skip</Text>
          </PressableOpacity>
        ),
        headerTitle: ""
      }} />
      <ScrollView contentContainerStyle={{height: "100%", alignItems: "center"}}>

        <View style={{alignItems: "center"}}>
          <View style={[{flexDirection: "row", marginTop: 10, borderRadius: 15}, SHADOWS.medium]}>
          <View style={{
            backgroundColor: COLORS.ltBlue,
            paddingHorizontal: 10,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Foundation name="male-symbol" size={50} color={COLORS.blue} />
          </View>
          <Pressable>
            {({pressed}) => (
              <View style={{
                backgroundColor: pressed ? COLORS.pink : COLORS.dkPink,
                paddingHorizontal: 10,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                borderWidth: 3,
                borderColor: pressed ? "transparent" : COLORS.pink,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Foundation name="female-symbol" size={50} color={COLORS.ltPink} />
              </View>
            )}
          </Pressable>
          </View>
        </View>


        <View style={{height: 200, width: "100%"}}>
          <Avatar />
        </View>



        <View style={{flex: 2}}>
        
        </View>

      </ScrollView>
    </SafeAreaView>
  )  
}


export default TutorialView;