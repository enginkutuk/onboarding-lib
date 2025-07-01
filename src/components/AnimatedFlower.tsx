import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Flower2, Sparkles, Leaf } from 'lucide-react-native';

interface AnimatedFlowerProps {
  size?: number;
  color?: string;
  animate?: boolean;
  imageSource?: ImageSourcePropType;
}

export default function AnimatedFlower({ 
  size = 80, 
  color = '#6366F1', 
  animate = true,
  imageSource
}: AnimatedFlowerProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);
  const sparkle3 = useSharedValue(0);
  const leaf1 = useSharedValue(0);
  const leaf2 = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      // Main flower entrance animation
      scale.value = withDelay(
        300,
        withSequence(
          withTiming(1.2, { duration: 800, easing: Easing.out(Easing.back(1.5)) }),
          withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
        )
      );

      opacity.value = withDelay(
        300,
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) })
      );

      // Gentle rotation animation
      rotation.value = withDelay(
        1000,
        withRepeat(
          withTiming(360, {
            duration: 8000,
            easing: Easing.linear,
          }),
          -1,
          false
        )
      );

      // Sparkle animations
      sparkle1.value = withDelay(
        1200,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }),
            withTiming(0, { duration: 600, easing: Easing.in(Easing.ease) }),
            withTiming(0, { duration: 1200 })
          ),
          -1,
          false
        )
      );

      sparkle2.value = withDelay(
        1800,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }),
            withTiming(0, { duration: 500, easing: Easing.in(Easing.ease) }),
            withTiming(0, { duration: 1400 })
          ),
          -1,
          false
        )
      );

      sparkle3.value = withDelay(
        2200,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) }),
            withTiming(0, { duration: 700, easing: Easing.in(Easing.ease) }),
            withTiming(0, { duration: 1000 })
          ),
          -1,
          false
        )
      );

      // Leaf animations
      leaf1.value = withDelay(
        1500,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }),
            withTiming(0.8, { duration: 1000, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        )
      );

      leaf2.value = withDelay(
        2000,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }),
            withTiming(0.7, { duration: 1200, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        )
      );
    }
  }, [animate]);

  const flowerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const sparkle1Style = useAnimatedStyle(() => {
    return {
      opacity: sparkle1.value,
      transform: [{ scale: sparkle1.value }],
    };
  });

  const sparkle2Style = useAnimatedStyle(() => {
    return {
      opacity: sparkle2.value,
      transform: [{ scale: sparkle2.value }],
    };
  });

  const sparkle3Style = useAnimatedStyle(() => {
    return {
      opacity: sparkle3.value,
      transform: [{ scale: sparkle3.value }],
    };
  });

  const leaf1Style = useAnimatedStyle(() => {
    return {
      opacity: leaf1.value,
      transform: [
        { scale: leaf1.value },
        { rotate: `${interpolate(leaf1.value, [0, 1], [0, 15])}deg` }
      ],
    };
  });

  const leaf2Style = useAnimatedStyle(() => {
    return {
      opacity: leaf2.value,
      transform: [
        { scale: leaf2.value },
        { rotate: `${interpolate(leaf2.value, [0, 1], [0, -20])}deg` }
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Background leaves */}
      <Animated.View style={[styles.leaf, styles.leaf1, leaf1Style]}>
        <Leaf size={size * 0.4} color="#10B981" strokeWidth={2} />
      </Animated.View>
      <Animated.View style={[styles.leaf, styles.leaf2, leaf2Style]}>
        <Leaf size={size * 0.3} color="#14B8A6" strokeWidth={2} />
      </Animated.View>

      {/* Main flower */}
      <Animated.View style={flowerStyle}>
        {/*<Flower2 size={size} color={color} strokeWidth={2} />*/}
        {/*<Image*/}
        {/*  source={slide.imageSource}*/}
        {/*  style={styles.image}*/}
        {/*/>*/}

        <Image
          source={imageSource}
          style={{height:180,width:180,borderRadius:15}}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Sparkles */}
      <Animated.View style={[styles.sparkle, styles.sparkle1, sparkle1Style]}>
        <Sparkles size={size * 0.25} color="#F59E0B" strokeWidth={2} />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle2, sparkle2Style]}>
        <Sparkles size={size * 0.2} color="#EC4899" strokeWidth={2} />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle3, sparkle3Style]}>
        <Sparkles size={size * 0.22} color="#8B5CF6" strokeWidth={2} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 160,
    height: 160,
  },
  leaf: {
    position: 'absolute',
  },
  leaf1: {
    top: 20,
    left: 10,
  },
  leaf2: {
    bottom: 25,
    right: 15,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: 15,
    right: 20,
  },
  sparkle2: {
    bottom: 20,
    left: 25,
  },
  sparkle3: {
    top: 40,
    left: 15,
  },
});