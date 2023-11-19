import { Pressable } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PressableOpacity = ({ onPress, style, children }) => {
  const opacity = useSharedValue(1);

  const handlePressIn = () => opacity.value = withSpring(0.6, {
    velocity: 0.001
  });

  const handlePressOut = () => opacity.value = withSpring(1, {
    velocity: 0.1
  })
  
  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={style}
    >
      {children}
    </AnimatedPressable>
  )
}

export default PressableOpacity;
