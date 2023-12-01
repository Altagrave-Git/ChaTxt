import { View, ScrollView, Pressable, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";
import { Avatar } from "../../components/avatar";
import { Foundation, AntDesign } from "@expo/vector-icons";
import { useSession, useTheme } from "../../global";
import { AvatarBuilder } from "../../components/avatar/builder";
import { useState } from "react";
import AvatarIcon from "../../components/avatar/icons/icons";
import { Tab } from "@rneui/themed";


const TutorialView = () => {
  const { theme } = useTheme();
  const { session } = useSession();
  const builder = AvatarBuilder();

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER */}
      <Stack.Screen options={{
        headerStyle: { backgroundColor: theme.primary },
        headerShadowVisible: true,
        headerTitle: "Create Avatar",
        headerTitleStyle: { fontFamily: FONT.cute, fontSize: SIZES.xxLarge, color: theme.highlight,  },
        headerTitleAlign: "center"
      }} />
      <ScrollView>

        {/* SET GENDER */}
        <View style={{alignItems: "center"}}>
          <View style={[{flexDirection: "row", marginTop: 30, borderRadius: 15, width: 160, height: 65, padding: 1}, SHADOWS.medium]}>
            <Pressable style={{flexGrow: 1}} onPress={builder.setMale} disabled={builder.gender === 'M' ? true : false}>
              {({pressed}) => (
                <View style={{
                  paddingHorizontal: 10,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  borderWidth: 4,
                  backgroundColor: builder.gender === 'M' || pressed ? COLORS.blue : COLORS.dkBlue,
                  borderColor: pressed || builder.gender === 'M' ? 'transparent' : COLORS.blue
                }}>
                  <Foundation name="male-symbol" size={50} color={COLORS.ltBlue} />
                </View>
              )}
            </Pressable>

            <Pressable style={{flexGrow: 1}} onPress={builder.setFemale} disabled={builder.gender === 'F' ? true : false}>
              {({pressed}) => (
                <View style={{
                  paddingHorizontal: 10,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  borderWidth: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  backgroundColor: builder.gender === 'F' || pressed ? COLORS.pink : COLORS.dkPink,
                  borderColor: pressed || builder.gender === 'F' ? "transparent" : COLORS.pink,
                }}>
                  <Foundation name="female-symbol" size={50} color={COLORS.ltPink} />
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* RENDER AVATAR */}
        <View style={{width: "100%", maxHeight: 300}}>
          <Avatar avatar={{...builder.avatar, [builder.category]: builder.avatar[builder.category]}} />
        </View>


        <View style={{flexDirection: "row", justifyContent: "space-evenly", width: "100%", display: "none"}}>
          <View style={{width: "50%", alignItems: "center"}}>
            <Pressable onPress={null}>
              <AntDesign name="caretup" size={40} color={theme.primary} />
            </Pressable>
            
            <Text style={{fontSize: 40, fontFamily: FONT.cute}}>{builder.category[0].toUpperCase() + builder.category.slice(1)}</Text>

            <Pressable onPress={null}>
              <AntDesign name="caretdown" size={40} color={theme.primary} />
            </Pressable>
          </View>

          <View style={{width: "50%", alignItems: "center"}}>
            <Pressable onPress={builder.prevItem}>
              <AntDesign name="caretup" size={40} color={theme.primary} />
            </Pressable>

            <Text style={{fontSize: 40, fontFamily: FONT.cute}}>{builder.itemIndex}</Text>

            <Pressable onPress={builder.nextItem}>
              <AntDesign name="caretdown" size={40} color={theme.primary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Tab
        value={builder.categories.indexOf(builder.category)}
        onChange={(e) => builder.setCategory(builder.categories[e])}
        indicatorStyle={{
          backgroundColor: COLORS.dkGreen,
          height: 3,
          margin: 0,
          padding: 0,
        }}
        style={{backgroundColor: theme.primary, overflow: "hidden", maxWidth: 992}}
        variant="default"
      >
        { builder.categories.map((val, index) => (
          <Tab.Item
            key={index}
            icon={(active) => <AvatarIcon category={val} color={active ? COLORS.green : theme.highlight} style={{width: "100%", height: 30}} />}
            buttonStyle={(active) => ({
              paddingVertical: 12
            })}
          />
        ))}
      </Tab>
    </SafeAreaView>
  )  
}


export default TutorialView;