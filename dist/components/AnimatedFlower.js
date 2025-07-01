import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, withDelay, interpolate, Easing, runOnUI, useReducedMotion, } from 'react-native-reanimated';
import { Flower2 } from 'lucide-react-native';
export default function AnimatedFlower({ size = 80, color = '#6366F1', animate = true, imageSource }) {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const sparkle1 = useSharedValue(0);
    const sparkle2 = useSharedValue(0);
    const sparkle3 = useSharedValue(0);
    const leaf1 = useSharedValue(0);
    const leaf2 = useSharedValue(0);
    const reducedMotion = useReducedMotion();
    useEffect(() => {
        if (animate && !reducedMotion) {
            runOnUI(() => {
                'worklet';
                // Main flower entrance animation - optimize edildi
                scale.value = withDelay(200, // Delay azaltıldı
                withSequence(withTiming(1.1, { duration: 600, easing: Easing.out(Easing.back(1.2)) }), // Duration azaltıldı
                withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })));
                opacity.value = withDelay(200, withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }));
                // Gentle rotation animation - daha yavaş
                rotation.value = withDelay(800, withRepeat(withTiming(360, {
                    duration: 12000, // Daha yavaş rotasyon
                    easing: Easing.linear,
                }), -1, false));
                // Sparkle animations - optimize edildi, daha az sıklık
                sparkle1.value = withDelay(1000, withRepeat(withSequence(withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 2000 }) // Daha uzun bekleme
                ), -1, false));
                sparkle2.value = withDelay(1600, withRepeat(withSequence(withTiming(1, { duration: 700, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 700, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 2200 })), -1, false));
                sparkle3.value = withDelay(2000, withRepeat(withSequence(withTiming(1, { duration: 900, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 900, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 1800 })), -1, false));
                // Leaf animations - optimize edildi
                leaf1.value = withDelay(1200, withRepeat(withSequence(withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) }), withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) })), -1, true));
                leaf2.value = withDelay(1800, withRepeat(withSequence(withTiming(1, { duration: 1800, easing: Easing.out(Easing.ease) }), withTiming(0.7, { duration: 1800, easing: Easing.inOut(Easing.ease) })), -1, true));
            })();
        }
        else if (!animate || reducedMotion) {
            // Reduced motion - sadece basit fade in
            runOnUI(() => {
                'worklet';
                scale.value = withTiming(1, { duration: 300 });
                opacity.value = withTiming(1, { duration: 300 });
            })();
        }
    }, [animate, reducedMotion]);
    const flowerStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [
                { rotate: `${rotation.value}deg` },
                { scale: scale.value },
            ],
            opacity: opacity.value,
        };
    }, []);
    const sparkle1Style = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: sparkle1.value,
            transform: [{ scale: sparkle1.value }],
        };
    }, []);
    const sparkle2Style = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: sparkle2.value,
            transform: [{ scale: sparkle2.value }],
        };
    }, []);
    const sparkle3Style = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: sparkle3.value,
            transform: [{ scale: sparkle3.value }],
        };
    }, []);
    const leaf1Style = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: leaf1.value,
            transform: [
                { scale: leaf1.value },
                { rotate: `${interpolate(leaf1.value, [0, 1], [0, 15])}deg` }
            ],
        };
    }, []);
    const leaf2Style = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: leaf2.value,
            transform: [
                { scale: leaf2.value },
                { rotate: `${interpolate(leaf2.value, [0, 1], [0, -20])}deg` }
            ],
        };
    }, []);
    return (_jsx(View, { style: styles.container, children: _jsx(Animated.View, { style: flowerStyle, children: imageSource ? (_jsx(Image, { source: imageSource, style: { height: 180, width: 180, borderRadius: 15 }, resizeMode: "cover" })) : (_jsx(Flower2, { size: size, color: color, strokeWidth: 2 })) }) }));
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
        top: 35,
        right: 5,
    },
});
