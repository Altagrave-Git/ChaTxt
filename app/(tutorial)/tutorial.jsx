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
  const { avatar, choices, gender, setMale, setFemale, setItem } = AvatarBuilder();

  const categories = Object.keys(choices);
  
  const [category, setCategory] = useState(0);
  const [itemArray, setItemArray] = useState(choices[categories[category]]);
  const [currentItem, setCurrentItem] = useState(choices[categories[category]].findIndex(obj => obj.name === avatar[categories[category]].name));

  const handlePrev = (array, arrayIndex, setArrayIndex) => {
    let newIndex;
    if (arrayIndex > 0 && array.length > 1) {
      newIndex = arrayIndex - 1;
    } else if (array.length > 1) {
      newIndex = array.length - 1;
    } else {
      newIndex = 0;
    }
    setArrayIndex(newIndex)
    return newIndex;
  }
  
  const handleNext = (array, arrayIndex, setArrayIndex) => {
    let newIndex;
    if (array.length - 1 > arrayIndex && array.length > 1) {
      newIndex = arrayIndex + 1;
    } else if (array.length > 1) {
      newIndex = 0;
    } else {
      newIndex = 0;
    }
    setArrayIndex(newIndex);
    return newIndex;
  }

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
            <Pressable style={{flexGrow: 1}} onPress={setMale} disabled={gender === 'M' ? true : false}>
              {({pressed}) => (
                <View style={{
                  paddingHorizontal: 10,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  borderWidth: 4,
                  backgroundColor: gender === 'M' || pressed ? COLORS.blue : COLORS.dkBlue,
                  borderColor: pressed || gender === 'M' ? 'transparent' : COLORS.blue
                }}>
                  <Foundation name="male-symbol" size={50} color={COLORS.ltBlue} />
                </View>
              )}
            </Pressable>

            <Pressable style={{flexGrow: 1}} onPress={setFemale} disabled={gender === 'F' ? true : false}>
              {({pressed}) => (
                <View style={{
                  paddingHorizontal: 10,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  borderWidth: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  backgroundColor: gender === 'F' || pressed ? COLORS.pink : COLORS.dkPink,
                  borderColor: pressed || gender === 'F' ? "transparent" : COLORS.pink,
                }}>
                  <Foundation name="female-symbol" size={50} color={COLORS.ltPink} />
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* RENDER AVATAR */}
        <View style={{width: "100%", maxHeight: 300}}>
          <Avatar avatar={{...avatar, [categories[category]]: avatar[categories[category]]}} />
        </View>


        <View style={{flexDirection: "row", justifyContent: "space-evenly", width: "100%", display: "none"}}>
          <View style={{width: "50%", alignItems: "center"}}>
            <Pressable onPress={() => {
              const newCategory = handlePrev(categories, category, setCategory);
              setItemArray(choices[categories[newCategory]]);
              setCurrentItem(0);
            }}>
              <AntDesign name="caretup" size={40} color={theme.primary} />
            </Pressable>
            
            <Text style={{fontSize: 40, fontFamily: FONT.cute}}>{categories[category][0].toUpperCase() + categories[category].slice(1)}</Text>

            <Pressable onPress={() => {
              const newCategory = handleNext(categories, category, setCategory);
              setItemArray(choices[categories[newCategory]]);
              setCurrentItem(0);
            }}>
              <AntDesign name="caretdown" size={40} color={theme.primary} />
            </Pressable>
          </View>

          <View style={{width: "50%", alignItems: "center"}}>
            <Pressable onPress={() => handlePrev(itemArray, currentItem, setCurrentItem)}>
              <AntDesign name="caretup" size={40} color={theme.primary} />
            </Pressable>

            <Text style={{fontSize: 40, fontFamily: FONT.cute}}>{currentItem}</Text>

            <Pressable onPress={() => handleNext(itemArray, currentItem, setCurrentItem)}>
              <AntDesign name="caretdown" size={40} color={theme.primary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Tab
        value={category}
        onChange={(e) => setCategory(e)}
        indicatorStyle={{
          backgroundColor: COLORS.dkGreen,
          height: 3,
          margin: 0,
          padding: 0,
        }}
        style={{backgroundColor: theme.primary, overflow: "hidden", maxWidth: 992}}
        variant="default"
      >
        { categories.map((item, index) => (
          <Tab.Item
            key={index}
            icon={(active) => <AvatarIcon category={item} color={active ? COLORS.green : theme.highlight} style={{width: "100%", height: 30}} />}
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