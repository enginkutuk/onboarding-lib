import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, withDelay, interpolate, Easing, runOnUI, useReducedMotion, } from 'react-native-reanimated';
import { Sparkles, Eye, Brain, Scan } from 'lucide-react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
export default function ScanAnimation({ size = 120, color = '#10B981', animate = true, imageSource }) {
    const { t } = useLanguage();
    const scanLine = useSharedValue(0);
    const pulseScale = useSharedValue(1);
    const pulseOpacity = useSharedValue(0.3);
    const sparkle1 = useSharedValue(0);
    const sparkle2 = useSharedValue(0);
    const sparkle3 = useSharedValue(0);
    const sparkle4 = useSharedValue(0);
    const rotation = useSharedValue(0);
    const glowOpacity = useSharedValue(0);
    const reducedMotion = useReducedMotion();
    useEffect(() => {
        if (animate && !reducedMotion) {
            runOnUI(() => {
                'worklet';
                // Scanning line animation - optimize edildi
                scanLine.value = withRepeat(withSequence(withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }), // Daha yavaş
                withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })), -1, false);
                // Pulse animation - optimize edildi
                pulseScale.value = withRepeat(withSequence(withTiming(1.15, { duration: 2000, easing: Easing.out(Easing.ease) }), // Daha az scale
                withTiming(1, { duration: 2000, easing: Easing.in(Easing.ease) })), -1, false);
                pulseOpacity.value = withRepeat(withSequence(withTiming(0.5, { duration: 2000, easing: Easing.out(Easing.ease) }), // Daha az opacity
                withTiming(0.2, { duration: 2000, easing: Easing.in(Easing.ease) })), -1, false);
                // Sparkle animations - optimize edildi, daha az sıklık
                sparkle1.value = withDelay(400, withRepeat(withSequence(withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 1000, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 2000 }) // Daha uzun bekleme
                ), -1, false));
                sparkle2.value = withDelay(1000, withRepeat(withSequence(withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 2400 })), -1, false));
                sparkle3.value = withDelay(1600, withRepeat(withSequence(withTiming(1, { duration: 900, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 900, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 2200 })), -1, false));
                sparkle4.value = withDelay(2200, withRepeat(withSequence(withTiming(1, { duration: 1100, easing: Easing.out(Easing.ease) }), withTiming(0, { duration: 1100, easing: Easing.in(Easing.ease) }), withTiming(0, { duration: 1800 })), -1, false));
                // Rotation animation - daha yavaş
                rotation.value = withRepeat(withTiming(360, {
                    duration: 15000, // Daha yavaş rotasyon
                    easing: Easing.linear,
                }), -1, false);
                // Glow effect - optimize edildi
                glowOpacity.value = withRepeat(withSequence(withTiming(0.6, { duration: 3000, easing: Easing.inOut(Easing.ease) }), // Daha yavaş
                withTiming(0.2, { duration: 3000, easing: Easing.inOut(Easing.ease) })), -1, false);
            })();
        }
        else if (!animate || reducedMotion) {
            // Reduced motion - minimal animasyon
            runOnUI(() => {
                'worklet';
                pulseScale.value = withTiming(1, { duration: 300 });
                pulseOpacity.value = withTiming(0.4, { duration: 300 });
                glowOpacity.value = withTiming(0.3, { duration: 300 });
            })();
        }
    }, [animate, reducedMotion]);
    const scanLineStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [
                {
                    translateY: interpolate(scanLine.value, [0, 1], [-size / 2, size / 2])
                }
            ],
            opacity: interpolate(scanLine.value, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
        };
    }, [size]);
    const pulseStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{ scale: pulseScale.value }],
            opacity: pulseOpacity.value,
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
    const sparkle4Style = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: sparkle4.value,
            transform: [{ scale: sparkle4.value }],
        };
    }, []);
    const rotationStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    }, []);
    const glowStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: glowOpacity.value,
        };
    }, []);
    return (_jsxs(View, { style: [styles.container, { width: size + 40, height: size + 40 }], children: [_jsx(Animated.View, { style: [
                    styles.glow,
                    {
                        width: size + 20,
                        height: size + 20,
                        backgroundColor: color,
                    },
                    glowStyle
                ] }), _jsx(Animated.View, { style: [
                    styles.pulseRing,
                    {
                        width: size + 30,
                        height: size + 30,
                        borderColor: color,
                    },
                    pulseStyle
                ] }), _jsxs(View, { style: [styles.scanContainer, { width: size, height: size }], children: [_jsx(View, { style: [styles.corner, styles.topLeft, { borderColor: color }] }), _jsx(View, { style: [styles.corner, styles.topRight, { borderColor: color }] }), _jsx(View, { style: [styles.corner, styles.bottomLeft, { borderColor: color }] }), _jsx(View, { style: [styles.corner, styles.bottomRight, { borderColor: color }] }), !reducedMotion && (_jsx(Animated.View, { style: [
                            styles.scanLine,
                            {
                                backgroundColor: color,
                                width: size - 20,
                            },
                            scanLineStyle
                        ] })), _jsx(View, { style: styles.centerContent, children: imageSource ? (_jsx(Image, { source: imageSource, style: { width: size * 0.4, height: size * 0.4, borderRadius: 8 }, resizeMode: "cover" })) : (_jsx(Animated.View, { style: rotationStyle, children: _jsx(Scan, { size: size * 0.3, color: color, strokeWidth: 2 }) })) })] }), !reducedMotion && (_jsxs(_Fragment, { children: [_jsx(Animated.View, { style: [styles.sparkle, styles.sparkle1, sparkle1Style], children: _jsx(Sparkles, { size: size * 0.15, color: "#F59E0B", strokeWidth: 1.5 }) }), _jsx(Animated.View, { style: [styles.sparkle, styles.sparkle2, sparkle2Style], children: _jsx(Sparkles, { size: size * 0.12, color: "#EC4899", strokeWidth: 1.5 }) })] })), _jsx(View, { style: [styles.analysisIcon, styles.icon1], children: _jsx(Eye, { size: size * 0.12, color: "#10B981", strokeWidth: 2 }) }), _jsx(View, { style: [styles.analysisIcon, styles.icon2], children: _jsx(Brain, { size: size * 0.12, color: "#8B5CF6", strokeWidth: 2 }) })] }));
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    glow: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.1,
    },
    pulseRing: {
        position: 'absolute',
        borderRadius: 1000,
        borderWidth: 2,
        opacity: 0.3,
    },
    scanContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderWidth: 3,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    topRight: {
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    scanLine: {
        position: 'absolute',
        height: 2,
        shadowColor: '#10B981',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    sparkle: {
        position: 'absolute',
    },
    sparkle1: {
        top: 10,
        right: 15,
    },
    sparkle2: {
        bottom: 15,
        left: 20,
    },
    sparkle3: {
        top: 25,
        left: 10,
    },
    sparkle4: {
        bottom: 10,
        right: 25,
    },
    analysisIcon: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    icon1: {
        top: 5,
        left: 5,
    },
    icon2: {
        bottom: 5,
        right: 5,
    },
    icon3: {
        top: 5,
        right: 5,
    },
    icon4: {
        bottom: 5,
        left: 5,
    },
    icon5: {
        top: '50%',
        left: -10,
        marginTop: -12,
    },
    icon6: {
        top: '50%',
        right: -10,
        marginTop: -12,
    },
    resultContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        alignItems: 'center',
        marginTop: 20,
    },
    resultText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#10B981',
        textAlign: 'center',
        marginTop: 8,
    },
    statusText: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
    },
});
