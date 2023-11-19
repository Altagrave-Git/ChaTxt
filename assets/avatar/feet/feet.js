import { Path, G, Defs, Use } from "react-native-svg";

export const feetTypeA = (color) => [
  
]

export const feetColors = [
    "#000000"
]

export const Feet = (type=0, color=0, variant=0, varColor=0) => {
    const getType = () => {
        const types = [].concat(feetTypeA(feetColors[color]));
        return types[type];
    }

    return getType();
}