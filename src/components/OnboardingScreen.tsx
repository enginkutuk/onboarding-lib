import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Camera,
  Image as ImageIcon,
  HardDrive,
  History,
  Star,
  Crown,
  ArrowRight,
  ArrowLeft,
  Shield,
  Lock,
  MapPin,
} from 'lucide-react-native';

import ScanAnimation from './ScanAnimation';
import FeatureList from './FeatureList';
import RatingStars from './RatingStars';

import { OnboardingProps, OnboardingStep, ThemeColors } from '../types';
import defaultConfig from '../onboardingConfig.json';

const getAllSteps = (config: any) => {
  const baseSteps: OnboardingStep[] = [
    'welcome',
    'scan',
    'permissions',
    'history',
    'rating',
  ];
  
  if (config.onboarding.settings.showSubscription) {
    baseSteps.push('subscription');
  }
  
  return baseSteps;
};

const { width: screenWidth } = Dimensions.get('window');

interface OnboardingScreenProps extends OnboardingProps {
  themeColors: ThemeColors;
  actualTheme: 'light' | 'dark';
}

export default function OnboardingScreen({
  config = defaultConfig as any,
  logoSource,
  onComplete,
  onStepChange,
  themeColors,
  actualTheme,
}: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [rating, setRating] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const opacity = useSharedValue(1);
  const starScale = useSharedValue(1);
  const starRotation = useSharedValue(0);
  const ratingScale = useSharedValue(1);

  const styles = createStyles(themeColors);
  const STEPS = getAllSteps(config);
  const currentStepIndex = STEPS.indexOf(currentStep);

  const scrollToStep = (stepIndex: number) => {
    scrollViewRef.current?.scrollTo({
      x: stepIndex * screenWidth,
      animated: true,
    });
  };

  const proceedToNextStep = (nextStepName: OnboardingStep) => {
    const nextIndex = STEPS.indexOf(nextStepName);
    setCurrentStep(nextStepName);
    scrollToStep(nextIndex);
    onStepChange?.(nextStepName, nextIndex);
  };

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    
    if (nextIndex >= STEPS.length) {
      onComplete?.();
      return;
    }
    
    const nextStepName = STEPS[nextIndex];
    
    if (currentStep === 'permissions') {
      Alert.alert(
        'İzinler Verildi',
        'Kamera ve galeri erişimi başarıyla verildi.',
        [{ text: 'Tamam', onPress: () => proceedToNextStep(nextStepName) }]
      );
    } else {
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

  const handleScroll = (event: any) => {
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

  const handleRatingChange = (newRating: number) => {
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

    return (
    <>
      <LinearGradient
          colors={[gradientColors[0], gradientColors[1], gradientColors[2]]}
        style={styles.headerGradient}
      >
        {logoSource && (
          <Image 
            source={logoSource}
            style={{
              width: welcomeConfig.content.logo.width,
              height: welcomeConfig.content.logo.height,
              borderRadius: welcomeConfig.content.logo.borderRadius,
            }}
            resizeMode={welcomeConfig.content.logo.resizeMode as any}
          />
        )}
        <Text style={[styles.appTitle, { color: '#ffffff' }]}>
            {welcomeConfig.content.title}
        </Text>
        <Text style={[styles.appSubtitle, { color: '#ffffff' }]}>
            {welcomeConfig.content.subtitle}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.description, { color: themeColors.text }]}>
            {welcomeConfig.content.description}
        </Text>
        
        <FeatureList
            features={welcomeConfig.content.features.map(feature => feature)}
          color={themeColors.primary}
          textColor={themeColors.text}
        />
      </View>
    </>
  );
  };

  const renderScanStep = () => {
    const scanConfig = config.onboarding.steps.scan;
    
    return (
    <>
      <View style={styles.animationContainer}>
        <ScanAnimation 
          color={themeColors.primary} 
          imageSource={logoSource}
          size={120}
          animate={true}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.stepTitle, { color: themeColors.text }]}>
            {scanConfig.content.title}
        </Text>
        <Text style={[styles.stepSubtitle, { color: themeColors.subText }]}>
            {scanConfig.content.subtitle}
        </Text>
        <Text style={[styles.description, { color: themeColors.text }]}>
            {scanConfig.content.description}
        </Text>
        
        <FeatureList
            features={scanConfig.content.features.map(feature => feature)}
          color={themeColors.primary}
          textColor={themeColors.text}
        />
      </View>
    </>
  );
  };

  const renderPermissionsStep = () => {
    const permissionsConfig = config.onboarding.steps.permissions;
    
    return (
    <>
      <View style={styles.permissionHeader}>
        <View style={[styles.shieldContainer, { backgroundColor: permissionsConfig.icon.color + '20' }]}>
          <Shield 
            size={permissionsConfig.icon.size} 
            color={permissionsConfig.icon.color} 
            strokeWidth={permissionsConfig.icon.strokeWidth} 
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.stepTitle, { color: themeColors.text }]}>
          {permissionsConfig.content.title}
        </Text>
        <Text style={[styles.stepSubtitle, { color: themeColors.subText }]}>
          {permissionsConfig.content.subtitle}
        </Text>
        
        <View style={[styles.securityMessage, { backgroundColor: themeColors.success + '10' }]}>
          <Lock size={18} color={permissionsConfig.icon.color} strokeWidth={2} />
          <Text style={[styles.securityText, { color: themeColors.text }]}>
            {permissionsConfig.content.securityMessage}
          </Text>
        </View>

        <View style={styles.permissionsList}>
          {permissionsConfig.permissionsList.map((permission, index) => {
            const IconComponent = permission.icon.type === 'camera' ? Camera :
                                permission.icon.type === 'image' ? ImageIcon :
                                permission.icon.type === 'hard-drive' ? HardDrive :
                                permission.icon.type === 'map-pin' ? MapPin :
                                Camera;

            return (
              <View key={index} style={[styles.permissionItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                <View style={[styles.permissionIconContainer, { backgroundColor: permission.icon.color + '20' }]}>
                  <IconComponent 
                    size={permission.icon.size} 
                    color={permission.icon.color} 
                    strokeWidth={permission.icon.strokeWidth} 
                  />
                </View>
                <View style={styles.permissionContent}>
                  <Text style={[styles.permissionTitle, { color: themeColors.text }]}>
                    {permission.title}
                  </Text>
                  <Text style={[styles.permissionDesc, { color: themeColors.subText }]}>
                    {permission.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
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
    
    return (
    <>
      <View style={styles.iconContainer}>
        <View style={[styles.largeIconBg, { backgroundColor: historyConfig.icon.color + '20' }]}>
          <IconComponent 
            size={historyConfig.icon.size} 
            color={historyConfig.icon.color} 
            strokeWidth={historyConfig.icon.strokeWidth} 
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.stepTitle, { color: themeColors.text }]}>
          {historyConfig.content.title}
        </Text>
        <Text style={[styles.stepSubtitle, { color: themeColors.subText }]}>
          {historyConfig.content.subtitle}
        </Text>
        <Text style={[styles.description, { color: themeColors.text }]}>
          {historyConfig.content.description}
        </Text>
        
        <FeatureList
          features={historyConfig.content.features.map(feature => feature)}
          color={historyConfig.icon.color}
          textColor={themeColors.text}
        />
      </View>
    </>
  );
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

    return (
      <>
        <View style={styles.ratingContainer}>
          <Animated.View style={[styles.largeIconBg, { backgroundColor: ratingConfig.icon.color + '20' }, animatedStarStyle]}>
            <IconComponent 
              size={ratingConfig.icon.size} 
              color={ratingConfig.icon.color} 
              fill={ratingConfig.icon.fill ? ratingConfig.icon.color : 'none'} 
              strokeWidth={ratingConfig.icon.strokeWidth} 
            />
          </Animated.View>
          <Animated.View style={[styles.starsContainer, animatedRatingStyle, { shadowColor: themeColors.warning }]}>
            <RatingStars
              rating={rating}
              onRatingChange={handleRatingChange}
              size={40}
              color={ratingConfig.icon.color}
              interactive={true}
            />
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.stepTitle, { color: themeColors.text }]}>
            {ratingConfig.content.title}
          </Text>
          <Text style={[styles.stepSubtitle, { color: themeColors.subText }]}>
            {ratingConfig.content.subtitle}
          </Text>
          <Text style={[styles.description, { color: themeColors.text }]}>
            {ratingConfig.content.description}
          </Text>
          
          <FeatureList
            features={ratingConfig.content.features.map(feature => feature)}
            color={ratingConfig.icon.color}
            textColor={themeColors.text}
          />
        </View>
      </>
    );
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

    return (
    <>
      <LinearGradient
          colors={[gradientColors[0], gradientColors[1], gradientColors[2]]}
        style={styles.subscriptionHeader}
      >
          <IconComponent 
            size={subscriptionConfig.icon.size} 
            color={subscriptionConfig.icon.color} 
            strokeWidth={subscriptionConfig.icon.strokeWidth} 
          />
        <Text style={[styles.stepTitle, { color: '#ffffff' }]}>
            {subscriptionConfig.content.title}
        </Text>
        <Text style={[styles.stepSubtitle, { color: '#ffffff', opacity: 0.9 }]}>
            {subscriptionConfig.content.subtitle}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.description, { color: themeColors.text }]}>
            {subscriptionConfig.content.description}
        </Text>
        
        <FeatureList
            features={subscriptionConfig.content.features.map(feature => feature)}
          color={themeColors.purple}
          textColor={themeColors.text}
        />

        <View style={styles.pricingContainer}>
          <View style={[styles.pricingCard, { backgroundColor: themeColors.card, borderColor: themeColors.purple }]}>
            <Text style={[styles.pricingTitle, { color: themeColors.text }]}>
                {subscriptionConfig.content.pricing.yearly.title}
            </Text>
            <Text style={[styles.pricingPrice, { color: themeColors.purple }]}>
                {subscriptionConfig.content.pricing.yearly.price}
            </Text>
            <Text style={[styles.pricingDiscount, { color: themeColors.success }]}>
                {subscriptionConfig.content.pricing.yearly.discount}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: themeColors.purple }]}
          onPress={nextStep}
        >
          <Text style={styles.primaryButtonText}>
              {subscriptionConfig.navigation.next?.text || 'Continue'}
          </Text>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={[styles.termsText, { color: themeColors.subText }]}>
            {subscriptionConfig.content.terms} • {subscriptionConfig.content.privacy}
          </Text>
        </View>
      </View>
    </>
  );
  };

  const renderNavigationButtons = () => {
    const stepConfig = config.onboarding.steps[currentStep];
    const nextConfig = stepConfig.navigation.next;
    const skipConfig = stepConfig.navigation.skip;
    const backConfig = (stepConfig.navigation as any).back;

    return (
      <View style={styles.navigationButtons}>
        {backConfig?.show && (
          <TouchableOpacity
            style={[
              styles.navButton,
              backConfig.style,
            ]}
            onPress={prevStep}
          >
            <Text style={[styles.nextButtonText, backConfig.textStyle]}>
              {backConfig.text}
            </Text>
            {backConfig.icon === 'arrow-left' && <ArrowLeft size={20} color={backConfig.textStyle.color} strokeWidth={2} />}
          </TouchableOpacity>
        )}

        {nextConfig?.show && (
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              nextConfig.style,
            ]}
            onPress={nextStep}
          >
            <Text style={[styles.nextButtonText, nextConfig.textStyle]}>
              {nextConfig.text}
            </Text>
            {nextConfig.icon === 'arrow-right' && <ArrowRight size={20} color={nextConfig.textStyle.color} strokeWidth={2} />}
            {nextConfig.icon === 'star' && <Star size={20} color={nextConfig.textStyle.color} strokeWidth={2} />}
          </TouchableOpacity>
        )}

        {skipConfig?.show && (
          <TouchableOpacity
            style={[
              styles.navButton,
              skipConfig.style,
            ]}
            onPress={nextStep}
          >
            <Text style={[styles.nextButtonText, skipConfig.textStyle]}>
              {skipConfig.text}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
        >
          {STEPS.map((step, index) => (
            <View key={step} style={[styles.stepContainer, { width: screenWidth }]}>
              {step === 'welcome' && renderWelcomeStep()}
              {step === 'scan' && renderScanStep()}
              {step === 'permissions' && renderPermissionsStep()}
              {step === 'history' && renderHistoryStep()}
              {step === 'rating' && renderRatingStep()}
              {step === 'subscription' && renderSubscriptionStep()}
            </View>
          ))}
        </ScrollView>

        <View style={[styles.navigation, { backgroundColor: themeColors.card, borderTopColor: themeColors.border }]}>
          {config.onboarding.navigation.dots.show && (
          <View style={styles.progressContainer}>
            {STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  {
                      backgroundColor: index <= currentStepIndex 
                        ? config.onboarding.navigation.dots.activeColor 
                        : config.onboarding.navigation.dots.inactiveColor,
                  },
                ]}
              />
            ))}
          </View>
          )}

          {renderNavigationButtons()}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
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