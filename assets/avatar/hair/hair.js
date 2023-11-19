import { Path, G, Defs, Use } from "react-native-svg";

export const hairTypeA = (color) => [
  
]

export const hairColors = [
    "#000000"
]

export const Hair = (type=0, color=0, variant=0, varColor=0) => {
    const getType = () => {
        const types = [].concat(hairTypeA(hairColors[color]));
        return types[type];
    }

    return getType();
}