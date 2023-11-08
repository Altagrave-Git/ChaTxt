import Svg from "react-native-svg";
import Skin from "../../assets/avatar/skin";
import Legs from "../../assets/avatar/legs";
import Feet from "../../assets/avatar/feet";
import Torso from "../../assets/avatar/torso";
import Hands from "../../assets/avatar/hands";
import Eyes from "../../assets/avatar/eyes";
import Mouth from "../../assets/avatar/mouth";

const Avatar = ({ skin=0, eyes=0, mouth=0, torso=0, hands=0, legs=0, feet=0 }) => {
    return (
        <Svg id="stage-svg" preserveAspectRatio="none" viewBox="0 0 385 385">
            {Skin[skin]}
            {Legs[legs]}
            {Feet[feet]}
            {Torso[torso]}
            {Hands[hands]}
            {Eyes[eyes]}
            {Mouth[mouth]}
        </Svg>
    )
}

export default Avatar;