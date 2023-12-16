import Svg, { LinearGradient, Rect, Stop, Defs } from "react-native-svg";
import { StyleSheet } from "react-native";

const SVGGradient = ({colorA, colorB, x1, y1, x2, y2}) => {
  const svgID = `G${Math.random()}`.split(".").join('-');
  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
      <Defs>
        <LinearGradient id={svgID} x1={x1} y1={y1} x2={x2} y2={y2} >
          <Stop offset="0" stopColor={ colorA } />
          <Stop offset="1" stopColor={ colorB } />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${svgID})`} />
    </Svg>
  )
};

class BaseGradient {
  LtoR = ({colors}) => (
    <SVGGradient colorA={colors[0]} colorB={colors[1]} x1={"0%"} y1={"0%"} x2={"100%"} y2={"0%"} />
  )

  TtoB = ({colors}) => (
    <SVGGradient colorA={colors[0]} colorB={colors[1]} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"} />
  )

  TLtoBR = ({colors}) => (
    <SVGGradient colorA={colors[0]} colorB={colors[1]} x1={"0%"} y1={"0%"} x2={"100%"} y2={"100%"} />
  )

  BLtoTR = ({colors}) => (
    <SVGGradient colorA={colors[1]} colorB={colors[1]} x1={"0%"} y1={"100%"} x2={"100%"} y2={"0%"} />
  )
}

const Gradient = new BaseGradient();

export default Gradient;