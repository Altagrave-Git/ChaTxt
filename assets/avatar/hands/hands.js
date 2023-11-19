import { Path, G, Defs, Use } from "react-native-svg";

export const handsTypeA = (color) => [
  
]

export const handsColors = [
    "#000000"
]

export const Torso = (type=0, color=0, variant=0, varColor=0) => {
    const getType = () => {
        const types = [].concat(handsTypeA(handsColors[color]));
        return types[type];
    }

    return getType();
}