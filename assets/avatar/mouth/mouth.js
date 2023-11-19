import { Path, Use, G, Defs } from "react-native-svg";
import { mouthTypes } from "./types";
import { COLORS } from "../../../constants/theme";

export const mouthColors = ["#000000", "#FF5D5D"];

export const Mouth = (type='A', scheme=0, colors=[], name="smile") => {
    const mouth = mouthTypes[type][scheme](colors)[name];

    return mouth;
}