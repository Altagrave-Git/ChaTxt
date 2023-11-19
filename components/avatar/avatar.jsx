import Svg from "react-native-svg";
import { Hair, Legs, Hands, Feet } from "../../assets/avatar";
import { Skin } from "../../assets/avatar/skin/skin";
import { Eyes } from "../../assets/avatar/eyes";
import { Torso } from "../../assets/avatar/torso/torso";
import { Mouth } from "../../assets/avatar";


const Avatar = ({ skin={}, hair={}, eyes={}, mouth={}, torso={}, hands={}, legs={}, feet={} }) => {
    return (
        <Svg id="stage-svg" preserveAspectRatio="none" viewBox="0 0 385 385">
            {Skin(0, 0, 0, 0)}
            {Hair[0]}
            {Eyes(0, 0, 0, 0)}
            {Mouth("A", 0, [], "crooked")}
            {Torso(0, 0, 0, 0)}
            {Legs[0]}
            {Hands[0]}
            {Feet[0]}
        </Svg>
    )
}

export default Avatar;