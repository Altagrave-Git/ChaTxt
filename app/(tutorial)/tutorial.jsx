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
import { BedroomA, BedroomB } from "../../components/background/bedroom";
import Gradient from "../../components/common/gradients/gradient";

const TutorialView = () => {
  const { theme } = useTheme();
  const { session } = useSession();
  const builder = AvatarBuilder();

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER */}
      <Stack.Screen options={{headerTitle: "Create Avatar", headerBackground: () => Gradient.TLtoBR({colors: theme.barGradient})}} />

      <View style={{flex: 1}}>
        <View style={{alignItems: "center", height: "60%"}}>
          <View style={{position: "absolute", height: "100%", width: "100%"}}>
            { builder.gender === "M" ?
              <BedroomA />
            :
              <BedroomB />
            }
          </View>
          <View style={[styles.genderButtonWrapper, SHADOWS.small]}>
            <Pressable style={{flexGrow: 1}} onPress={builder.setMale} disabled={builder.gender === 'M' ? true : false}>
              {({pressed}) => (
                <View style={[styles.genderButton, {
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  backgroundColor: builder.gender === 'M' || pressed ? COLORS.blue : COLORS.dkBlue,
                  borderColor: pressed || builder.gender === 'M' ? 'transparent' : COLORS.blue
                }]}>
                  <Foundation name="male-symbol" size={50} color={COLORS.ltBlue} />
                </View>
              )}
            </Pressable>

            <Pressable style={{flexGrow: 1}} onPress={builder.setFemale} disabled={builder.gender === 'F' ? true : false}>
              {({pressed}) => (
                <View style={[styles.genderButton, {
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  backgroundColor: builder.gender === 'F' || pressed ? COLORS.pink : COLORS.dkPink,
                  borderColor: pressed || builder.gender === 'F' ? "transparent" : COLORS.pink,
                }]}>
                  <Foundation name="female-symbol" size={50} color={COLORS.ltPink} />
                </View>
              )}
            </Pressable>
          </View>


          <View style={{height: "100%", aspectRatio: 1, flexShrink: 1}}>
            <Avatar avatar={{...builder.avatar, [builder.category]: builder.item}} />
          </View>
        </View>

        <View style={{height: "40%", backgroundColor: theme.backgroundColor}}>
          <View style={{ width: "100%", flex: 1 }}>
            <View style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%", backgroundColor: theme.primary }}>
              <Gradient.TLtoBR colors={theme.barGradient} />
              <PressableOpacity onPress={builder.prevItem} style={{paddingHorizontal: 10, height: 40, alignItems: "center", justifyContent: "center"}}>
                <AntDesign name="caretleft" size={25} color={"#FFFFFFAA"} />
              </PressableOpacity>

              <Text style={{fontSize: 38, fontFamily: FONT.cute, color: theme.highlight}}>
                {builder.item.name.replace("_", " ")}
              </Text>

              <PressableOpacity onPress={builder.nextItem} style={{backgroundColor: "#FFFFFF00", paddingHorizontal: 10, height: 40, alignItems: "center", justifyContent: "center"}}>
                <AntDesign name="caretright" size={25} color={"#FFFFFFAA"} />
              </PressableOpacity>
            </View>

            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center", justifyContent: "center", width: "100%", backgroundColor: COLORS.ltYellow}}>
              <Gradient.TLtoBR colors={theme.menuGradient} />
              <View style={{ width: "100%"}}>
                { builder.item.scheme ? builder.item.colors.map((color, index) => (
                  <View key={index} style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingVertical: 15, paddingHorizontal: 25, margin: 10, borderRadius: 10, backgroundColor: theme.background, borderColor: theme.primary, borderWidth: 1}}>
                    <Text style={{ fontFamily: FONT.cute, fontSize: 36 }}>
                      Color{builder.item.colors.length > 1 ? ` ${index}` : ''}
                    </Text>
                    <PressableOpacity>
                      <View style={{ height: 48, width: 48, justifyContent: "center", alignItems: "center" }}>
                        <View style={{backgroundColor: color, height: 36, width: 36, margin: 4, borderRadius: 3, borderWidth: 4, borderColor: adjustColor(color)}} />
                      </View>
                    </PressableOpacity>
                  </View>
                )) : (
                  <View style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingVertical: 15, paddingHorizontal: 25}}>
                    <Text style={{fontFamily: FONT.cute, fontSize: 36}}>Color</Text>
                    <View style={{height: 48, width: 48, justifyContent: "center", alignItems: "center"}}>
                      <MaterialCommunityIcons name="checkbox-blank-off-outline" size={48} color={COLORS.gray} />
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>

          </View>

          {/*
          { Object.keys(builder.palette).map((pallete, index) => (
            <View key={index} style={{flexDirection: "row", flexWrap: "wrap"}}>
              <Text>{pallete}</Text>
              { Object.values(builder.palette[pallete]).map((colorHex, index) => (
                <View key={index} style={{backgroundColor: `${colorHex}`, height: 30, width: 30}}></View>
              ))}
            </View>
          ))}
          */}

          <PressableOpacity
          style={{position: "absolute", bottom: 15, right: 15}}
          onPress={() => builder.equipItem()}>
            <View style={{height: 50, width: 50, borderRadius: 50, backgroundColor: theme.tertiary, alignItems: "center", justifyContent: "center"}}>
              <Text style={{fontFamily: FONT.cute, fontSize: 24, color: theme.highlight}}>EQUIP</Text>
            </View>
          </PressableOpacity>
        </View>
      </View>

      <View>
        <Gradient.TLtoBR colors={theme.barGradient} />
        <Tab
          value={builder.categories.indexOf(builder.category)}
          onChange={(e) => builder.setCategory(builder.categories[e])}
          indicatorStyle={{
            backgroundColor: theme.selected,
            height: 3,
            margin: 0,
            padding: 0,
          }}
          style={{backgroundColor: "#00000000", overflow: "hidden", maxWidth: 992}}
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
      </View>
    </SafeAreaView>
  )  
}

const styles = {
  genderButtonWrapper: {
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 15,
    aspectRatio: 2,
    height: 65
  },
  genderButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderWidth: 3,
    paddingHorizontal: 10
  }
}


export default TutorialView;