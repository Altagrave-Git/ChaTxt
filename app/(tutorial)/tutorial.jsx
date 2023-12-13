import { View, ScrollView, Pressable, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";
import { Avatar, adjustColor } from "../../components/avatar";
import { Foundation, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession, useTheme } from "../../global";
import { AvatarBuilder } from "../../components/avatar/builder";
import AvatarIcon from "../../components/avatar/icons/icons";
import { Tab } from "@rneui/themed";
import { PressableOpacity } from "../../components/common/button";


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

        {/* SET GENDER */}
      <View style={{flex: 1, alignItems: "center"}}>
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
        <View style={{width: "100%", aspectRatio: 1, maxHeight: 300}}>
          <Avatar avatar={{...builder.avatar, [builder.category]: builder.item}} />
        </View>


        <View style={{ width: "100%", flex: 1 }}>
          <View style={{justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", width: "100%" }}>
            <PressableOpacity onPress={builder.prevItem}>
              <AntDesign name="caretleft" size={30} color={COLORS.ltYellow} />
            </PressableOpacity>

            <Text style={{fontSize: 40, fontFamily: FONT.cute}}>
              {builder.category[0].toUpperCase()+builder.category.slice(1)}{builder.items.length > 1 ? ` ${builder.itemIndex + 1}` : null}
            </Text>

            <PressableOpacity onPress={builder.nextItem}>
              <AntDesign name="caretright" size={30} color={COLORS.ltYellow} />
            </PressableOpacity>
          </View>

          <View style={{ width: "100%", flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            { builder.item.scheme ? builder.item.colors.map((color, index) => (
              <View key={index} style={{alignItems: "center"}}>
                <Text style={{ fontFamily: FONT.cute, fontSize: 36 }}>
                  Color{builder.item.colors.length > 1 ? ` ${index}` : ''}
                </Text>
                <PressableOpacity>
                  <View style={{ height: 40, justifyContent: "center" }}>
                    <View style={{backgroundColor: color, height: 28, width: 28, margin: 4, borderRadius: 3, borderWidth: 3, borderColor: adjustColor(color)}} />
                  </View>
                </PressableOpacity>
              </View>
            )) : (
              <View style={{alignItems: "center"}}>
                <Text style={{fontFamily: FONT.cute, fontSize: 36}}>Color</Text>
                <View style={{height: 40, justifyContent: "center"}}>
                  <MaterialCommunityIcons name="checkbox-blank-off-outline" size={38} color={COLORS.gray} />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      <PressableOpacity
      style={{position: "absolute", bottom: 75, right: 25}}
      onPress={() => builder.equipItem()}>
        <View style={{height: 50, width: 50, borderRadius: 50, backgroundColor: theme.tertiary, alignItems: "center", justifyContent: "center"}}>
          <Text style={{fontFamily: FONT.cute, fontSize: 24, color: theme.highlight}}>EQUIP</Text>
        </View>
      </PressableOpacity>

      <Tab
        value={builder.categories.indexOf(builder.category)}
        onChange={(e) => builder.setCategory(builder.categories[e])}
        indicatorStyle={{
          backgroundColor: theme.selected,
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
            icon={(active) => <AvatarIcon category={val} color={active ? theme.selected : theme.highlight} style={{width: "100%", height: 30}} />}
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