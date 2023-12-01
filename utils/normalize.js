import { Dimensions } from "react-native";
import { PixelRatio } from "react-native";


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

const [widthBaseScale, heightBaseScale] = [SCREEN_WIDTH / 360, SCREEN_HEIGHT / 727];

const normalize = (size, base = 'width') => {
  const newSize = (base === 'height') ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const wPx = (size) => {
  return normalize(size, 'width');
}

const hPx = (size) => {
  return normalize(size, 'height');
}

export {
  wPx,
  hPx
}