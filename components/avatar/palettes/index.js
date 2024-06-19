import { starter } from "./starter";
import { premium500 } from "./premium/500";

const palettes = [
  ...starter,
  ...premium500
]

// Palette sets mapped by type
export const paletteSets = palettes.reduce((acc, paletteSet) => {
  paletteSet.types.forEach(type => {
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(paletteSet);
  });
  return acc;
}, {});