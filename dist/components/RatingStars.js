import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withSequence, withTiming, } from 'react-native-reanimated';
import { Star } from 'lucide-react-native';
export default function RatingStars({ rating, onRatingChange, size = 32, color = '#FFD700', interactive = false, }) {
    const scales = [
        useSharedValue(0),
        useSharedValue(0),
        useSharedValue(0),
        useSharedValue(0),
        useSharedValue(0),
    ];
    useEffect(() => {
        scales.forEach((scale, index) => {
            scale.value = withDelay(index * 100, withSequence(withSpring(1.2, { damping: 8, stiffness: 100 }), withSpring(1, { damping: 8, stiffness: 100 })));
        });
    }, []);
    const handleStarPress = (starIndex) => {
        if (interactive && onRatingChange) {
            onRatingChange(starIndex + 1);
            // Animate the pressed star
            scales[starIndex].value = withSequence(withTiming(1.3, { duration: 100 }), withSpring(1, { damping: 8, stiffness: 100 }));
        }
    };
    return (_jsx(View, { style: styles.container, children: [0, 1, 2, 3, 4].map((index) => {
            const animatedStyle = useAnimatedStyle(() => {
                return {
                    transform: [{ scale: scales[index].value }],
                };
            });
            const StarComponent = interactive ? TouchableOpacity : View;
            return (_jsx(StarComponent, { style: styles.starContainer, onPress: () => handleStarPress(index), disabled: !interactive, children: _jsx(Animated.View, { style: animatedStyle, children: _jsx(Star, { size: size, color: index < rating ? color : '#E0E0E0', fill: index < rating ? color : 'transparent', strokeWidth: 2 }) }) }, index));
        }) }));
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    starContainer: {
        padding: 4,
    },
});
