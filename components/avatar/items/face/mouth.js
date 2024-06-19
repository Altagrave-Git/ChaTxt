import { Path, G } from "react-native-svg";

const mouth = {
  Open_Frown: {
    obj: (colors) => (
      <G>
        <Path fill="#000000" d="m 216.67319,226.16466 c 1e-5,3.50627 -7.33342,0.96012 -16.54177,0.96012 -9.20836,0 -16.80462,2.54615 -16.80461,-0.96012 1e-5,-3.50627 7.46485,-6.34866 16.67319,-6.34866 9.20834,0 16.67318,2.84239 16.67319,6.34866 z" />
      </G>
    ),
    M: true,
    F: true,
    scheme: 0,
    colors: [],
    category: 'face',
    subcategory: 'mouth',
    name: 'Open_Frown'
  },
  Open_Smile: {
    obj: (colors) => (
      <G>
        <Path fill="#000000" d="m 216.67319,221.66914 c 1e-5,-3.50627 -7.33342,-0.96012 -16.54177,-0.96012 -9.20836,0 -16.80462,-2.54615 -16.80461,0.96012 1e-5,3.50627 7.46485,6.34866 16.67319,6.34866 9.20834,0 16.67318,-2.84239 16.67319,-6.34866 z" />
      </G>
    ),
    M: true,
    F: true,
    scheme: 0,
    colors: [],
    category: 'face',
    subcategory: 'mouth',
    name: 'Open_Smile'
  },
}


export default mouth;