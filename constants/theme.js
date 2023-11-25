const COLORS = {
  blue: "#0d6efd",
  indigo: "#6610f2",
  purple: "#6f42c1",
  pink: "#d63384",
  red: "#dc3545",
  orange: "#ff6f34",
  yellow: "#ffc107",
  green: "#198754",
  teal: "##4dd4ac",
  cyan: "#0dcaf0",
  gray: "#adb5bd",
  white: "#ffffff",
  black: "#000000",
  dark: "#212529",
  light: "#f8f9fa",
  ltBlue: "#9ec5fe",
  ltIndigo: "#a370f7",
  ltPurple: "#a98eda",
  ltPink: "#e685b5",
  ltRed: "#ea868f",
  ltOrange: "#feb272",
  ltYellow: "#ffda6a",
  ltGreen: "#a3cfbb",
  ltTeal: "#a6e9d5",
  ltcyan: "#9eeaf9",
  ltGray: "#ced4da",
  dtBlue: "#083180",
  dkIndigo: "#3d0a91",
  dkPurple: "#432874",
  dkPink: "#ab296a",
  dkRed: "#842029",
  dkOrange: "#984c0c",
  dkYellow: "#cc9a06",
  dkGreen: "#0f5132",
  dkTeal: "#1aa179",
  dkCyan: "#0aa2c0",
  dkGray: "#495057",
};

const THEMES = {
  default: {
    primary: COLORS.yellow,
    secondary: COLORS.orange,
    tertiary: COLORS.red,
    background: COLORS.light,
    highlight: COLORS.white,
    input: COLORS.white,
    text: COLORS.dark,
    placeholder: COLORS.gray,
  }
};

const FONT = {
  regular: "Regular",
  medium: "Medium",
  bold: "Bold",
  cute: "Cute"
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 36,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS, THEMES };
