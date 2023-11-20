import Svg from "react-native-svg";
import AvatarItem from "./avataritem";



const avatar = {
  skin: { type: "A", name: "skin_A2_0", colors: ["#FFE69A", "#F0B800"] },
  hair: { type: "A", name: "hair_A0_0", colors: [] },
  eyes: { type: "A", name: "eyes_A0_0", colors: [], },
  mouth: { type: "B", name: "mouth_B0_0", colors: [] },
  torso: { type: "A", name: "torso_A0_1", colors: [] },
  hands: { type: "B", name: "hands_B1_0", colors: ["#2289aa"] },
  legs: { type: "A", name: "legs_A1_0", colors: [] },
  feet: { type: "A", name: "feet_A1_0", colors: ["#888"] }
}


const Avatar = ({ skin={}, hair={}, eyes={}, mouth={}, torso={}, hands={}, legs={}, feet={} }) => {

  return (
    <Svg id="stage-svg" preserveAspectRatio="none" viewBox="0 0 385 385">
      { Object.keys(avatar).map((category, index) => <AvatarItem category={category} item={avatar[category]} key={index} />) }
    </Svg>
  )
}

export default Avatar;