import { Svg, G, Use, Path, Defs } from "react-native-svg";
import AvatarItem from "./avataritem";


const avatarTest = {
  skin: { type: "A", name: "skin_A_0", colors: ["#FFE69A", "#F0B800"] },
  hair: { type: "A", name: "hair_A_2", colors: ["#FFDD22"] },
  eyes: { type: "A", name: "eyes_A_2", colors: [], },
  mouth: { type: "B", name: "mouth_B_1", colors: [] },
  torso: { type: "A", name: "torso_A_1", colors: [] },
  hands: { type: "A", name: "hands_A_0", colors: [] },
  legs: { type: "A", name: "legs_A_0", colors: [] },
  feet: { type: "A", name: "feet_A_0", colors: ["#888"] }
}


const Avatar = ({ avatar=avatarTest }) => {

  return (
    <Svg id="stage-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 385 385">
      { Object.keys(avatar).map((category, index) => <AvatarItem category={category} item={avatar[category]} key={index} />) }
    </Svg>
  )
}

export default Avatar;