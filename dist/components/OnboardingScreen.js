import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import { Camera, Image as ImageIcon, HardDrive, History, Star, Crown, ArrowRight, ArrowLeft, Shield, Lock, MapPin, } from 'lucide-react-native';
import ScanAnimation from './ScanAnimation';
import FeatureList from './FeatureList';
import RatingStars from './RatingStars';
import defaultConfig from '../onboardingConfig.json';
const STEPS = [
    'welcome',
    'scan',
    'permissions',
    'history',
    'rating',
    'subscription',
];
const { width: screenWidth } = Dimensions.get('window');
export default function OnboardingScreen({ config = defaultConfig, logoSource, onComplete, onStepChange, themeColors, actualTheme, t, }) {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [rating, setRating] = useState(0);
    const scrollViewRef = useRef(null);
    const opacity = useSharedValue(1);
    const starScale = useSharedValue(1);
    const starRotation = useSharedValue(0);
    const ratingScale = useSharedValue(1);
    const styles = createStyles(themeColors);
    const currentStepIndex = STEPS.indexOf(currentStep);
    const scrollToStep = (stepIndex) => {
        scrollViewRef.current?.scrollTo({
            x: stepIndex * screenWidth,
            animated: true,
        });
    };
    const proceedToNextStep = (nextStepName) => {
        const nextIndex = STEPS.indexOf(nextStepName);
        setCurrentStep(nextStepName);
        scrollToStep(nextIndex);
        onStepChange?.(nextStepName, nextIndex);
    };
    const nextStep = () => {
        const nextIndex = (currentStepIndex + 1) % STEPS.length;
        if (nextIndex === 0) {
            onComplete?.();
            return;
        }
        const nextStepName = STEPS[nextIndex];
        if (currentStep === 'permissions') {
            Alert.alert('İzinler Verildi', 'Kamera ve galeri erişimi başarıyla verildi.', [{ text: 'Tamam', onPress: () => proceedToNextStep(nextStepName) }]);
        }
        else {
            proceedToNextStep(nextStepName);
        }
    };
    const prevStep = () => {
        if (currentStepIndex > 0) {
            const prevIndex = currentStepIndex - 1;
            const prevStepName = STEPS[prevIndex];
            setCurrentStep(prevStepName);
            scrollToStep(prevIndex);
            onStepChange?.(prevStepName, prevIndex);
        }
    };
    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(scrollX / screenWidth);
        if (newIndex !== currentStepIndex && newIndex >= 0 && newIndex < STEPS.length) {
            const newStep = STEPS[newIndex];
            setCurrentStep(newStep);
            onStepChange?.(newStep, newIndex);
        }
    };
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollToStep(currentStepIndex);
        }
    }, []);
    useEffect(() => {
        if (currentStep === 'rating') {
            setRating(0);
            const animateStars = () => {
                let currentRating = 0;
                const interval = setInterval(() => {
                    currentRating++;
                    setRating(currentRating);
                    ratingScale.value = withSpring(1.1, {
                        damping: 10,
                        stiffness: 120,
                    }, () => {
                        ratingScale.value = withSpring(1, {
                            damping: 10,
                            stiffness: 120,
                        });
                    });
                    if (currentRating >= 5) {
                        clearInterval(interval);
                        setTimeout(() => {
                            const startPulse = () => {
                                starScale.value = withSpring(1.05, {
                                    damping: 8,
                                    stiffness: 120,
                                }, () => {
                                    starScale.value = withSpring(1, {
                                        damping: 8,
                                        stiffness: 120,
                                    }, () => {
                                        if (currentStep === 'rating') {
                                            setTimeout(startPulse, 2000);
                                        }
                                    });
                                });
                            };
                            startPulse();
                        }, 500);
                    }
                }, 200);
            };
            setTimeout(animateStars, 100);
        }
    }, [currentStep]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        starScale.value = withSpring(1.2, {
            damping: 8,
            stiffness: 100,
        }, () => {
            starScale.value = withSpring(1, {
                damping: 8,
                stiffness: 100,
            });
        });
        starRotation.value = withSpring(360, {
            damping: 8,
            stiffness: 100,
        }, () => {
            starRotation.value = 0;
        });
        ratingScale.value = withSpring(1.1, {
            damping: 10,
            stiffness: 120,
        }, () => {
            ratingScale.value = withSpring(1, {
                damping: 10,
                stiffness: 120,
            });
        });
    };
    const renderWelcomeStep = () => {
        const welcomeConfig = config.onboarding.steps.welcome;
        const gradientColors = actualTheme === 'dark'
            ? welcomeConfig.gradientColors.dark
            : welcomeConfig.gradientColors.light;
        return (_jsxs(_Fragment, { children: [_jsxs(LinearGradient, { colors: [gradientColors[0], gradientColors[1], gradientColors[2]], style: styles.headerGradient, children: [logoSource && (_jsx(Image, { source: logoSource, style: {
                                width: welcomeConfig.content.logo.width,
                                height: welcomeConfig.content.logo.height,
                                borderRadius: welcomeConfig.content.logo.borderRadius,
                            }, resizeMode: welcomeConfig.content.logo.resizeMode })), _jsx(Text, { style: [styles.appTitle, { color: '#ffffff' }], children: t(welcomeConfig.content.title) }), _jsx(Text, { style: [styles.appSubtitle, { color: '#ffffff' }], children: t(welcomeConfig.content.subtitle) })] }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.description, { color: themeColors.text }], children: t(welcomeConfig.content.description) }), _jsx(FeatureList, { features: welcomeConfig.content.features.map(feature => t(feature)), color: themeColors.primary, textColor: themeColors.text })] })] }));
    };
    const renderScanStep = () => {
        const scanConfig = config.onboarding.steps.scan;
        return (_jsxs(_Fragment, { children: [_jsx(View, { style: styles.animationContainer, children: _jsx(ScanAnimation, { color: themeColors.primary, imageSource: logoSource, size: 120, animate: true }) }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.stepTitle, { color: themeColors.text }], children: t(scanConfig.content.title) }), _jsx(Text, { style: [styles.stepSubtitle, { color: themeColors.subText }], children: t(scanConfig.content.subtitle) }), _jsx(Text, { style: [styles.description, { color: themeColors.text }], children: t(scanConfig.content.description) }), _jsx(FeatureList, { features: scanConfig.content.features.map(feature => t(feature)), color: themeColors.primary, textColor: themeColors.text })] })] }));
    };
    const renderPermissionsStep = () => {
        const permissionsConfig = config.onboarding.steps.permissions;
        return (_jsxs(_Fragment, { children: [_jsx(View, { style: styles.permissionHeader, children: _jsx(View, { style: [styles.shieldContainer, { backgroundColor: permissionsConfig.icon.color + '20' }], children: _jsx(Shield, { size: permissionsConfig.icon.size, color: permissionsConfig.icon.color, strokeWidth: permissionsConfig.icon.strokeWidth }) }) }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.stepTitle, { color: themeColors.text }], children: t(permissionsConfig.content.title) }), _jsx(Text, { style: [styles.stepSubtitle, { color: themeColors.subText }], children: t(permissionsConfig.content.subtitle) }), _jsxs(View, { style: [styles.securityMessage, { backgroundColor: themeColors.success + '10' }], children: [_jsx(Lock, { size: 18, color: permissionsConfig.icon.color, strokeWidth: 2 }), _jsx(Text, { style: [styles.securityText, { color: themeColors.text }], children: t(permissionsConfig.content.securityMessage) })] }), _jsx(View, { style: styles.permissionsList, children: permissionsConfig.permissionsList.map((permission, index) => {
                                const IconComponent = permission.icon.type === 'camera' ? Camera :
                                    permission.icon.type === 'image' ? ImageIcon :
                                        permission.icon.type === 'hard-drive' ? HardDrive :
                                            permission.icon.type === 'map-pin' ? MapPin :
                                                Camera;
                                return (_jsxs(View, { style: [styles.permissionItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }], children: [_jsx(View, { style: [styles.permissionIconContainer, { backgroundColor: permission.icon.color + '20' }], children: _jsx(IconComponent, { size: permission.icon.size, color: permission.icon.color, strokeWidth: permission.icon.strokeWidth }) }), _jsxs(View, { style: styles.permissionContent, children: [_jsx(Text, { style: [styles.permissionTitle, { color: themeColors.text }], children: t(permission.title) }), _jsx(Text, { style: [styles.permissionDesc, { color: themeColors.subText }], children: t(permission.description) })] })] }, index));
                            }) })] })] }));
    };
    const renderHistoryStep = () => {
        const historyConfig = config.onboarding.steps.history;
        const IconComponent = historyConfig.icon.type === 'history' ? History :
            historyConfig.icon.type === 'star' ? Star :
                historyConfig.icon.type === 'crown' ? Crown :
                    historyConfig.icon.type === 'shield' ? Shield :
                        historyConfig.icon.type === 'camera' ? Camera :
                            historyConfig.icon.type === 'image' ? ImageIcon :
                                historyConfig.icon.type === 'hard-drive' ? HardDrive :
                                    historyConfig.icon.type === 'map-pin' ? MapPin :
                                        History;
        return (_jsxs(_Fragment, { children: [_jsx(View, { style: styles.iconContainer, children: _jsx(View, { style: [styles.largeIconBg, { backgroundColor: historyConfig.icon.color + '20' }], children: _jsx(IconComponent, { size: historyConfig.icon.size, color: historyConfig.icon.color, strokeWidth: historyConfig.icon.strokeWidth }) }) }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.stepTitle, { color: themeColors.text }], children: t(historyConfig.content.title) }), _jsx(Text, { style: [styles.stepSubtitle, { color: themeColors.subText }], children: t(historyConfig.content.subtitle) }), _jsx(Text, { style: [styles.description, { color: themeColors.text }], children: t(historyConfig.content.description) }), _jsx(FeatureList, { features: historyConfig.content.features.map(feature => t(feature)), color: historyConfig.icon.color, textColor: themeColors.text })] })] }));
    };
    const renderRatingStep = () => {
        const ratingConfig = config.onboarding.steps.rating;
        const IconComponent = ratingConfig.icon.type === 'star' ? Star :
            ratingConfig.icon.type === 'history' ? History :
                ratingConfig.icon.type === 'crown' ? Crown :
                    ratingConfig.icon.type === 'shield' ? Shield :
                        ratingConfig.icon.type === 'camera' ? Camera :
                            ratingConfig.icon.type === 'image' ? ImageIcon :
                                ratingConfig.icon.type === 'hard-drive' ? HardDrive :
                                    ratingConfig.icon.type === 'map-pin' ? MapPin :
                                        Star;
        const animatedStarStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    { scale: starScale.value },
                    { rotate: `${starRotation.value}deg` },
                ],
            };
        });
        const animatedRatingStyle = useAnimatedStyle(() => {
            return {
                transform: [{ scale: ratingScale.value }],
            };
        });
        return (_jsxs(_Fragment, { children: [_jsxs(View, { style: styles.ratingContainer, children: [_jsx(Animated.View, { style: [styles.largeIconBg, { backgroundColor: ratingConfig.icon.color + '20' }, animatedStarStyle], children: _jsx(IconComponent, { size: ratingConfig.icon.size, color: ratingConfig.icon.color, fill: ratingConfig.icon.fill ? ratingConfig.icon.color : 'none', strokeWidth: ratingConfig.icon.strokeWidth }) }), _jsx(Animated.View, { style: [styles.starsContainer, animatedRatingStyle, { shadowColor: themeColors.warning }], children: _jsx(RatingStars, { rating: rating, onRatingChange: handleRatingChange, size: 40, color: ratingConfig.icon.color, interactive: true }) })] }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.stepTitle, { color: themeColors.text }], children: t(ratingConfig.content.title) }), _jsx(Text, { style: [styles.stepSubtitle, { color: themeColors.subText }], children: t(ratingConfig.content.subtitle) }), _jsx(Text, { style: [styles.description, { color: themeColors.text }], children: t(ratingConfig.content.description) }), _jsx(FeatureList, { features: ratingConfig.content.features.map(feature => t(feature)), color: ratingConfig.icon.color, textColor: themeColors.text })] })] }));
    };
    const renderSubscriptionStep = () => {
        const subscriptionConfig = config.onboarding.steps.subscription;
        const gradientColors = actualTheme === 'dark'
            ? subscriptionConfig.gradientColors.dark
            : subscriptionConfig.gradientColors.light;
        const IconComponent = subscriptionConfig.icon.type === 'crown' ? Crown :
            subscriptionConfig.icon.type === 'star' ? Star :
                subscriptionConfig.icon.type === 'history' ? History :
                    subscriptionConfig.icon.type === 'shield' ? Shield :
                        subscriptionConfig.icon.type === 'camera' ? Camera :
                            subscriptionConfig.icon.type === 'image' ? ImageIcon :
                                subscriptionConfig.icon.type === 'hard-drive' ? HardDrive :
                                    subscriptionConfig.icon.type === 'map-pin' ? MapPin :
                                        Crown;
        return (_jsxs(_Fragment, { children: [_jsxs(LinearGradient, { colors: [gradientColors[0], gradientColors[1], gradientColors[2]], style: styles.subscriptionHeader, children: [_jsx(IconComponent, { size: subscriptionConfig.icon.size, color: subscriptionConfig.icon.color, strokeWidth: subscriptionConfig.icon.strokeWidth }), _jsx(Text, { style: [styles.stepTitle, { color: '#ffffff' }], children: t(subscriptionConfig.content.title) }), _jsx(Text, { style: [styles.stepSubtitle, { color: '#ffffff', opacity: 0.9 }], children: t(subscriptionConfig.content.subtitle) })] }), _jsxs(View, { style: styles.content, children: [_jsx(Text, { style: [styles.description, { color: themeColors.text }], children: t(subscriptionConfig.content.description) }), _jsx(FeatureList, { features: subscriptionConfig.content.features.map(feature => t(feature)), color: themeColors.purple, textColor: themeColors.text }), _jsx(View, { style: styles.pricingContainer, children: _jsxs(View, { style: [styles.pricingCard, { backgroundColor: themeColors.card, borderColor: themeColors.purple }], children: [_jsx(Text, { style: [styles.pricingTitle, { color: themeColors.text }], children: t(subscriptionConfig.content.pricing.yearly.title) }), _jsx(Text, { style: [styles.pricingPrice, { color: themeColors.purple }], children: t(subscriptionConfig.content.pricing.yearly.price) }), _jsx(Text, { style: [styles.pricingDiscount, { color: themeColors.success }], children: t(subscriptionConfig.content.pricing.yearly.discount) })] }) }), _jsx(TouchableOpacity, { style: [styles.primaryButton, { backgroundColor: themeColors.purple }], onPress: nextStep, children: _jsx(Text, { style: styles.primaryButtonText, children: t(subscriptionConfig.navigation.next?.text || 'Continue') }) }), _jsx(View, { style: styles.termsContainer, children: _jsxs(Text, { style: [styles.termsText, { color: themeColors.subText }], children: [t('onboarding.subscription.terms'), " \u2022 ", t('onboarding.subscription.privacy')] }) })] })] }));
    };
    const renderNavigationButtons = () => {
        const stepConfig = config.onboarding.steps[currentStep];
        const nextConfig = stepConfig.navigation.next;
        const skipConfig = stepConfig.navigation.skip;
        const backConfig = stepConfig.navigation.back;
        return (_jsxs(View, { style: styles.navigationButtons, children: [backConfig?.show && (_jsxs(TouchableOpacity, { style: [
                        styles.navButton,
                        backConfig.style,
                    ], onPress: prevStep, children: [_jsx(Text, { style: [styles.nextButtonText, backConfig.textStyle], children: t(backConfig.text) }), backConfig.icon === 'arrow-left' && _jsx(ArrowLeft, { size: 20, color: backConfig.textStyle.color, strokeWidth: 2 })] })), nextConfig?.show && (_jsxs(TouchableOpacity, { style: [
                        styles.navButton,
                        styles.nextButton,
                        nextConfig.style,
                    ], onPress: nextStep, children: [_jsx(Text, { style: [styles.nextButtonText, nextConfig.textStyle], children: t(nextConfig.text) }), nextConfig.icon === 'arrow-right' && _jsx(ArrowRight, { size: 20, color: nextConfig.textStyle.color, strokeWidth: 2 }), nextConfig.icon === 'star' && _jsx(Star, { size: 20, color: nextConfig.textStyle.color, strokeWidth: 2 })] })), skipConfig?.show && (_jsx(TouchableOpacity, { style: [
                        styles.navButton,
                        skipConfig.style,
                    ], onPress: nextStep, children: _jsx(Text, { style: [styles.nextButtonText, skipConfig.textStyle], children: t(skipConfig.text) }) }))] }));
    };
    return (_jsx(SafeAreaView, { style: [styles.container, { backgroundColor: themeColors.background }], children: _jsxs(Animated.View, { style: [styles.animatedContainer, animatedStyle], children: [_jsx(ScrollView, { ref: scrollViewRef, style: styles.scrollView, horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, onMomentumScrollEnd: handleScroll, scrollEventThrottle: 16, children: STEPS.map((step, index) => (_jsxs(View, { style: [styles.stepContainer, { width: screenWidth }], children: [step === 'welcome' && renderWelcomeStep(), step === 'scan' && renderScanStep(), step === 'permissions' && renderPermissionsStep(), step === 'history' && renderHistoryStep(), step === 'rating' && renderRatingStep(), step === 'subscription' && renderSubscriptionStep()] }, step))) }), _jsxs(View, { style: [styles.navigation, { backgroundColor: themeColors.card, borderTopColor: themeColors.border }], children: [config.onboarding.navigation.dots.show && (_jsx(View, { style: styles.progressContainer, children: STEPS.map((_, index) => (_jsx(View, { style: [
                                    styles.progressDot,
                                    {
                                        backgroundColor: index <= currentStepIndex
                                            ? config.onboarding.navigation.dots.activeColor
                                            : config.onboarding.navigation.dots.inactiveColor,
                                    },
                                ] }, index))) })), renderNavigationButtons()] })] }) }));
}
const createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
    },
    animatedContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    stepContainer: {
        flex: 1,
        minHeight: '100%',
    },
    headerGradient: {
        height: 360,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    subscriptionHeader: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    permissionHeader: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shieldContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 36,
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 8,
    },
    appSubtitle: {
        fontSize: 18,
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
        opacity: 0.9,
    },
    stepTitle: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    stepSubtitle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    content: {
        flex: 1,
        padding: 20,
        margin: 20,
        paddingBottom: 100,
    },
    animationContainer: {
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeIconBg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    securityMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        gap: 10,
    },
    securityText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        lineHeight: 20,
    },
    permissionsList: {
        gap: 12,
    },
    permissionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
    },
    permissionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    permissionContent: {
        flex: 1,
    },
    permissionTitle: {
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 2,
    },
    permissionDesc: {
        fontSize: 13,
        fontFamily: 'Inter-Regular',
        lineHeight: 18,
    },
    ratingContainer: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starsContainer: {
        marginTop: 20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    pricingContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    pricingCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    pricingTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 8,
    },
    pricingPrice: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        marginBottom: 4,
    },
    pricingDiscount: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    primaryButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
    },
    termsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    termsText: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
    },
    navigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 5,
        paddingBottom: 0,
        borderTopWidth: 1,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        gap: 8,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        flex: 1,
        height: 60,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        gap: 8,
    },
    nextButton: {
        borderWidth: 0,
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
    },
});
