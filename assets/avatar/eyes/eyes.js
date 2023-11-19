import { eyesTypeA0 } from "./types";

export const eyesColors = [
    
]

export const Eyes = (type='a', scheme=0, colors=[]) => {
    const getType = () => {
        const types = [].concat(eyesTypeA(eyesColors[colors]));
        return types[type];
    }

    return getType();
}