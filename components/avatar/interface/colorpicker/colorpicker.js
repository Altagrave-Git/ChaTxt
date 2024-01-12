import { View, Text, ScrollView } from "react-native";
import Gradient from "../../../common/gradients/gradient";
import { FONT } from "../../../../constants"
import { adjustColor } from "../../../../utils/shade";
import stylesFn from "./colorpicker.styles";
import { PressableOpacity } from "../../../common/button";


const ColorPicker = ({ itemColorIndex, setItemColorIndex, theme, builder }) => {
  const styles = stylesFn(theme);

  return (
    <View style={[styles.container, {display: itemColorIndex < 0 ? "none" : "flex"}]}>
      <Gradient.LtoR colors={theme.menuGradient} />

      <View style={styles.headerBar}>
        <Gradient.TLtoBR colors={theme.barGradient} />
        <Text style={[styles.headerText, {fontFamily: FONT.cute}]}>Color Palettes</Text>
      </View>

      <ScrollView style={{flex: 1}}>
        { Object.keys(builder.palette).map((palette, index) => (
          <View key={index}>
            <View style={styles.paletteContainer}>
              <View style={styles.paletteTitleBlockLeft}></View>
              <View style={styles.paletteTitleBlock}>
                <Text style={[styles.paletteTitleText, {fontFamily: FONT.cute}]}>{palette}</Text>
              </View>
              <View style={styles.paletteTitleBlockRight}></View>

              <View style={styles.paletteTitleStrikethrough}>
                <View style={styles.paletteTitleStrikethroughOuter} />
                <View style={styles.paletteTitleStrikethroughInner} />
                <View style={styles.paletteTitleStrikethroughOuter} />
              </View>
            </View>
            <View style={styles.paletteColorContainer}>
              { Object.values(builder.palette[palette]).map((colorHex, index) => (
                <PressableOpacity key={index} onPress={() => builder.setColor(payload={colorHex, itemColorIndex})}>
                  <View style={[styles.colorSelect, {borderColor: adjustColor(colorHex), backgroundColor: `${colorHex}`}]} />
                </PressableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default ColorPicker;