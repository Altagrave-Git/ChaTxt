import PressableOpacity from "./opacity";
import { SIZES, FONT } from "../../../constants";
import { Text } from "react-native";

const HeaderButton = ({text, onPress, theme, active=false}) => (
  <PressableOpacity onPress={onPress}>
    <Text style={{
      fontFamily: FONT.cute,
      fontSize: SIZES.xxLarge,
      color: active ? theme.highlight : theme.secondary
    }}>{text}</Text>
  </PressableOpacity>
)

export default HeaderButton;