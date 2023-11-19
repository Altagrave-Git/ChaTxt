import { Path, G, Defs, Use } from "react-native-svg";

export const legsTypeA = (color) => [
  
]

export const legsColors = [
    "#000000"
]

export const Legs = (type=0, color=0, variant=0, varColor=0) => {
    const getType = () => {
        const types = [].concat(legsTypeA(legsColors[color]));
        return types[type];
    }

    return getType();
}