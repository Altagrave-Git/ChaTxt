import PressableOpacity from "./opacity";
import { SIZES, FONT } from "../../../constants";
import { Text } from "react-native";

const HeaderButton = ({text, onPress, theme, active=false}) => (
  <PressableOpacity onPress={onPress} disabled={active}>
    <Text style={{
      fontFamily: FONT.cute,
      fontSize: SIZES.xxLarge,
      color: active ? theme.secondary : theme.highlight
    }}>{text}</Text>
  </PressableOpacity>
)

export default HeaderButton;