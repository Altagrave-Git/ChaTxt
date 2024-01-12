import { View, Pressable, Text, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants/theme";
import { Avatar, AvatarBuilder, adjustColor, ItemSwiper } from "../../components/avatar";
import { Foundation, AntDesign } from "@expo/vector-icons";
import { useSession, useTheme } from "../../global";
import AvatarIcon from "../../components/avatar/icons/icons";
import { Tab } from "@rneui/themed";
import { PressableOpacity } from "../../components/common/button";
import { BedroomA, BedroomB } from "../../components/background/bedroom";
import Gradient from "../../components/common/gradients/gradient";
import { useState } from "react";
import ColorPicker from "../../components/avatar/interface/colorpicker/colorpicker";

const TutorialView = () => {
  const [itemColorIndex, setItemColorIndex] = useState(-1);
  
  const { theme } = useTheme();
  const { session } = useSession();
  const builder = AvatarBuilder();

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER */}
      <Stack.Screen options={{headerTitle: "Create Avatar"}} />

      <View style={{flex: 1}}>
        <View style={{alignItems: "center", height: "60%"}}>

          {/* AVATAR BACKGROUND */}
          <View style={{position: "absolute", height: "100%", width: "100%"}}>
            { builder.gender === "M" ?
              <BedroomA />
            :
              <BedroomB />
            }
          </View>

          {/* GENDER BUTTON GROUP */}
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

          {/* AVATAR */}
          <View style={{height: "100%", aspectRatio: 1, flexShrink: 1}}>
            <Avatar avatar={builder.avatar} />
          </View>
        </View>

        {/* ITEM SELECTION DRAWER */}
        <View style={{height: "40%", backgroundColor: theme.backgroundColor, display: itemColorIndex === -1 ? "flex" : "none"}}>
          <View style={{ width: "100%", flex: 1 }}>
            <View style={{justifyContent: "space-between", alignItems: "center", width: "100%", backgroundColor: theme.primary }}>
              <Gradient.TLtoBR colors={theme.barGradient} />
              <Text style={{fontFamily: FONT.cute, fontSize: 38, color: theme.background}}>{builder.item.type}</Text>
            </View>

            <View style={{flex: 1}}>
              <Gradient.TLtoBR colors={theme.menuGradient} />

              <ItemSwiper builder={builder} initialIndex={builder.itemIndex} setScrollIndex={builder.setScrollIndex} key={builder.category} />

              <View style={{position: "absolute", top: 0, right: 0, flexDirection: "row"}}>
                { builder.items[builder.scrollIndex].scheme > 0 && builder.currentColors[builder.category].slice(0, builder.items[builder.scrollIndex].scheme).map((color, index) => (
                  <PressableOpacity key={index} onPress={() => setItemColorIndex(index)}>
                    <View style={{backgroundColor: color, borderColor: adjustColor(color), height: 30, width: 30, marginRight: 10, marginTop: 10, borderRadius: 20, borderWidth: 2}} />
                  </PressableOpacity>
                ))}
              </View>

              { builder.itemIndex === builder.scrollIndex ? (
                <View style={{position: "absolute", bottom: 10, right: 10, borderRadius: 5, height: 30, width: 80, alignItems: "center", justifyContent: "center", backgroundColor: theme.primary}}>
                  <Text style={{fontFamily: FONT.cute, fontSize: 24, color: theme.highlight}}>CURRENT</Text>
                </View>
              ) : (
                <PressableOpacity
                  onPress={() => builder.equipItem()}
                  style={{position: "absolute", bottom: 10, right: 10}}
                >
                  <View style={{backgroundColor: "green", height: 30, width: 80, alignItems: "center", justifyContent: "center", borderRadius: 5}}>
                    <Text style={{fontFamily: FONT.cute, fontSize: 24, color: theme.highlight}}>EQUIP</Text>
                  </View>
                </PressableOpacity>
              )}
            </View>
          </View>
        </View>

        <ColorPicker itemColorIndex={itemColorIndex} setItemColorIndex={setItemColorIndex} theme={theme} builder={builder} />
      </View>

      {/* FOOTER BAR */}
      <View style={{height: "8%", minHeight: 50}}>
        <View style={StyleSheet.absoluteFill}>
          <Gradient.TLtoBR colors={theme.barGradient} />
        </View>
        <Tab
          value={builder.categories.indexOf(builder.category)}
          onChange={(e) => builder.setCategory(builder.categories[e])}
          indicatorStyle={{
            backgroundColor: theme.selected,
            height: 3,
            margin: 0,
            padding: 0,
          }}
          style={{backgroundColor: "#00000000", overflow: "hidden", maxWidth: 992, height: "100%"}}
          variant="default"
        >
          { builder.categories.map((val, index) => (
            <Tab.Item
              key={index}
              icon={(active) => <AvatarIcon category={val} color={active ? theme.selected : theme.highlight} style={{height: "100%", width: "100%", maxHeight: 40, maxWidth: 40, minHeight: 20, minWidth: 20}} />}
              buttonStyle={(active) => ({
                paddingVertical: 12,
                width: "100%"
              })}
              containerStyle={{width: 100}}
              style={{width: 100}}
              iconContainerStyle={{width: 100}}
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