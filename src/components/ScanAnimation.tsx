import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { 
  Camera, 
  CircleCheck as CheckCircle, 
  Sparkles, 
  Flower2, 
  Zap,
  Eye,
  Search,
  Brain,
  BadgeCheck,
  Trophy,
  Star,
  SearchCheck
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ScanAnimationProps {
  color?: string;
  imageSource?: ImageSourcePropType;
}

export default function ScanAnimation({ color = '#6366F1', imageSource }: ScanAnimationProps) {
  // Camera and photo states
  const cameraScale = useSharedValue(1);
  const cameraBackgroundOpacity = useSharedValue(1); // Camera background always visible
  const flashOpacity = useSharedValue(0);
  const photoScale = useSharedValue(0);
  const photoOpacity = useSharedValue(0);

  // Flower states
  const flowerScale = useSharedValue(0);
  const flowerOpacity = useSharedValue(0);
  const flowerRotation = useSharedValue(0);
  
  // Analysis states
  const scanLineY = useSharedValue(-100);
  const analysisProgress = useSharedValue(0);
  const brainScale = useSharedValue(0);
  const brainOpacity = useSharedValue(0);
  
  // Success states - Enhanced
  const successScale = useSharedValue(0);
  const successOpacity = useSharedValue(0);
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const identifiedScale = useSharedValue(0);
  const identifiedOpacity = useSharedValue(0);
  const badgeScale = useSharedValue(0);
  const badgeOpacity = useSharedValue(0);
  const trophyScale = useSharedValue(0);
  const trophyOpacity = useSharedValue(0);
  
  // Sparkle effects - Simplified
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);
  const sparkle3 = useSharedValue(0);
  const sparkle4 = useSharedValue(0);

  useEffect(() => {
    // Camera breathing animation
    cameraScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    const startSequence = () => {
      // Reset all values
      flashOpacity.value = 0;
      photoScale.value = 0;
      photoOpacity.value = 0;
      flowerScale.value = 0; // Start hidden
      flowerOpacity.value = 0; // Start hidden
      flowerRotation.value = 0;
      scanLineY.value = -100;
      analysisProgress.value = 0;
      brainScale.value = 0;
      brainOpacity.value = 0;
      successScale.value = 0;
      successOpacity.value = 0;
      checkScale.value = 0;
      checkOpacity.value = 0;
      identifiedScale.value = 0;
      identifiedOpacity.value = 0;
      badgeScale.value = 0;
      badgeOpacity.value = 0;
      trophyScale.value = 0;
      trophyOpacity.value = 0;
      sparkle1.value = 0;
      sparkle2.value = 0;
      sparkle3.value = 0;
      sparkle4.value = 0;

      // Camera background stays visible (giving camera open feeling)
      cameraBackgroundOpacity.value = 1;

      // Step 1: Camera flash effect (1.5s) - BEFORE showing flower
      flashOpacity.value = withDelay(
        1500,
        withSequence(
          withTiming(0.9, { duration: 100, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 200, easing: Easing.in(Easing.ease) })
        )
      );

      // Step 2: AFTER flash - Show flower image filling the animation area (1.8s)
      flowerOpacity.value = withDelay(
        1800,
        withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) })
      );
      flowerScale.value = withDelay(
        1800,
        withSequence(
          withTiming(1.1, { duration: 400, easing: Easing.out(Easing.back(1.2)) }),
          withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Step 3: Photo capture frame effect (2.0s)
      photoOpacity.value = withDelay(
        2000,
        withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) })
      );
      photoScale.value = withDelay(
        2000,
        withSequence(
          withTiming(1.05, { duration: 200, easing: Easing.out(Easing.ease) }),
          withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Step 4: Analysis begins - Brain appears (2.5s)
      brainOpacity.value = withDelay(
        2500,
        withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) })
      );
      brainScale.value = withDelay(
        2500,
        withSequence(
          withTiming(1.2, { duration: 300, easing: Easing.out(Easing.back(1.3)) }),
          withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Step 5: Scanning animation (2.8s - 5.5s)
      scanLineY.value = withDelay(
        2800,
        withSequence(
          // First scan
          withTiming(100, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(-100, { duration: 100 }),
          // Second scan (slower)
          withTiming(100, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(-100, { duration: 100 }),
          // Final detailed scan
          withTiming(100, { duration: 800, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Analysis progress (3s - 6s)
      analysisProgress.value = withDelay(
        3000,
        withTiming(1, { duration: 3000, easing: Easing.out(Easing.ease) })
      );

      // Step 6: Enhanced Success Animation Sequence (6.2s)
      
      // First: Main success indicator
      successOpacity.value = withDelay(
        6200,
        withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) })
      );
      successScale.value = withDelay(
        6200,
        withSequence(
          withTiming(1.3, { duration: 300, easing: Easing.out(Easing.back(1.5)) }),
          withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Second: Check mark appears (6.4s)
      checkOpacity.value = withDelay(
        6400,
        withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) })
      );
      checkScale.value = withDelay(
        6400,
        withSequence(
          withTiming(1.4, { duration: 200, easing: Easing.out(Easing.back(1.8)) }),
          withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Third: PROMINENT "IDENTIFIED" badge appears (6.7s)
      identifiedOpacity.value = withDelay(
        6700,
        withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) })
      );
      identifiedScale.value = withDelay(
        6700,
        withSequence(
          withTiming(1.3, { duration: 350, easing: Easing.out(Easing.back(1.5)) }),
          withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Fourth: Badge check appears (6.9s)
      badgeOpacity.value = withDelay(
        6900,
        withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) })
      );
      badgeScale.value = withDelay(
        6900,
        withSequence(
          withTiming(1.3, { duration: 200, easing: Easing.out(Easing.back(1.6)) }),
          withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Fifth: Trophy appears (7.1s)
      trophyOpacity.value = withDelay(
        7100,
        withTiming(1, { duration: 350, easing: Easing.out(Easing.ease) })
      );
      trophyScale.value = withDelay(
        7100,
        withSequence(
          withTiming(1.4, { duration: 250, easing: Easing.out(Easing.back(1.7)) }),
          withTiming(1, { duration: 250, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Clean celebration sparkles (7.3s - 8.5s)
      sparkle1.value = withDelay(
        7300,
        withSequence(
          withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.in(Easing.ease) })
        )
      );

      sparkle2.value = withDelay(
        7500,
        withSequence(
          withTiming(1, { duration: 350, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 550, easing: Easing.in(Easing.ease) })
        )
      );

      sparkle3.value = withDelay(
        7700,
        withSequence(
          withTiming(1, { duration: 450, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 650, easing: Easing.in(Easing.ease) })
        )
      );

      sparkle4.value = withDelay(
        7900,
        withSequence(
          withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.in(Easing.ease) })
        )
      );

      // Flower celebration rotation - Sınırlı rotasyon (camera alanı içinde kalması için)
      flowerRotation.value = withDelay(
        6500,
        withTiming(360, { duration: 2000, easing: Easing.out(Easing.ease) })
      );
    };

    // Start initial sequence
    startSequence();

    // Repeat the entire sequence
    const interval = setInterval(() => {
      startSequence();
    }, 10000); // Increased interval for longer animation

    return () => clearInterval(interval);
  }, []);

  // Animated styles
  const cameraStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cameraScale.value }],
  }));

  const cameraBackgroundStyle = useAnimatedStyle(() => ({
    opacity: cameraBackgroundOpacity.value,
  }));

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  const photoStyle = useAnimatedStyle(() => ({
    opacity: photoOpacity.value,
    transform: [{ scale: photoScale.value }],
  }));

  const flowerStyle = useAnimatedStyle(() => ({
    opacity: flowerOpacity.value,
    transform: [
      { scale: flowerScale.value },
      { rotate: `${flowerRotation.value}deg` }
    ],
  }));

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
    opacity: interpolate(scanLineY.value, [-100, -50, 50, 100], [0, 1, 1, 0]),
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(analysisProgress.value, [0, 1], [0, 100])}%`,
  }));

  const brainStyle = useAnimatedStyle(() => ({
    opacity: brainOpacity.value,
    transform: [{ scale: brainScale.value }],
  }));

  const successStyle = useAnimatedStyle(() => ({
    opacity: successOpacity.value,
    transform: [{ scale: successScale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [{ scale: checkScale.value }],
  }));

  const identifiedStyle = useAnimatedStyle(() => ({
    opacity: identifiedOpacity.value,
    transform: [{ scale: identifiedScale.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));

  const trophyStyle = useAnimatedStyle(() => ({
    opacity: trophyOpacity.value,
    transform: [{ scale: trophyScale.value }],
  }));

  const sparkle1Style = useAnimatedStyle(() => ({
    opacity: sparkle1.value,
    transform: [{ scale: sparkle1.value }],
  }));

  const sparkle2Style = useAnimatedStyle(() => ({
    opacity: sparkle2.value,
    transform: [{ scale: sparkle2.value }],
  }));

  const sparkle3Style = useAnimatedStyle(() => ({
    opacity: sparkle3.value,
    transform: [{ scale: sparkle3.value }],
  }));

  const sparkle4Style = useAnimatedStyle(() => ({
    opacity: sparkle4.value,
    transform: [{ scale: sparkle4.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Camera with breathing animation */}
      {/*<Animated.View style={[styles.cameraContainer, cameraStyle]}>
        <Camera size={50} color={color} strokeWidth={2} />
      </Animated.View>*/}

      {/* Main scanning area with camera background */}
      <View style={[styles.scanArea, { borderColor: color }]}>
        {/* Camera background - always visible to give "camera open" feeling */}
        <Animated.View style={[styles.cameraBackground, cameraBackgroundStyle]} />

        {/* Real flower image - appears AFTER flash, filling the animation area */}
        <Animated.View style={[styles.flowerContainer, flowerStyle]}>
          <Image 
            source={imageSource || require('../../assets/images/scan-icon.jpg')}
            style={styles.flowerImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Photo frame overlay */}
        <Animated.View style={[styles.photoFrame, { borderColor: color }, photoStyle]} />

        {/* Scanning line */}
        <Animated.View style={[styles.scanLine, { backgroundColor: color }, scanLineStyle]} />

        {/* Analysis progress bar */}
        <View style={[styles.progressContainer, { backgroundColor: color + '20' }]}>
          <Animated.View style={[styles.progressBar, { backgroundColor: color }, progressStyle]} />
        </View>

        {/* Corner brackets */}
        <View style={[styles.corner, styles.topLeft, { borderColor: color }]} />
        <View style={[styles.corner, styles.topRight, { borderColor: color }]} />
        <View style={[styles.corner, styles.bottomLeft, { borderColor: color }]} />
        <View style={[styles.corner, styles.bottomRight, { borderColor: color }]} />
      </View>

      {/* Flash effect */}
      <Animated.View style={[styles.flashOverlay, flashStyle]} />

      {/* AI Brain analyzing */}
      {/*<Animated.View style={[styles.brainContainer, brainStyle]}>*/}
      {/*  <Brain size={30} color="#8B5CF6" strokeWidth={2} />*/}
      {/*</Animated.View>*/}

      {/* Enhanced Success indicators */}
      {/*<Animated.View style={[styles.successContainer, successStyle]}>
        <Flower2 size={35} color="#10B981" strokeWidth={2} />
      </Animated.View>

      {/*<Animated.View style={[styles.checkContainer, checkStyle]}>
        <CheckCircle size={25} color="#10B981" fill="#10B981" strokeWidth={0} />
      </Animated.View>*/}

      {/* PROMINENT "IDENTIFIED" badge - Positioned prominently */}
      <Animated.View style={[styles.identifiedBadge, identifiedStyle]}>
        <View style={styles.identifiedContent}>
          <SearchCheck size={24} color="#ffffff" strokeWidth={2} />
          <Text style={styles.identifiedText}>TANIMLANDI</Text>
        </View>
      </Animated.View>

      {/* Badge check indicator 
      {/*<Animated.View style={[styles.badgeContainer, badgeStyle]}>
        <BadgeCheck size={22} color="#10B981" fill="#10B981" strokeWidth={0} />
      </Animated.View>*/}

      {/* Trophy for successful identification */}
      {/*<Animated.View style={[styles.trophyContainer, trophyStyle]}>
        <Trophy size={18} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
      </Animated.View>*/}

      {/* Clean celebration sparkles - Only 4 main sparkles */}
      <Animated.View style={[styles.sparkle, styles.sparkle1, sparkle1Style]}>
        <Sparkles size={18} color="#F59E0B" strokeWidth={2} />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle2, sparkle2Style]}>
        <Sparkles size={16} color="#EC4899" strokeWidth={2} />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle3, sparkle3Style]}>
        <Sparkles size={20} color="#8B5CF6" strokeWidth={2} />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle4, sparkle4Style]}>
        <Sparkles size={17} color="#10B981" strokeWidth={2} />
      </Animated.View>

      {/* Status indicators */}
      {/*<View style={styles.statusContainer}>*/}
      {/*  <Eye size={16} color={color} strokeWidth={2} />*/}
      {/*  <Search size={16} color={color} strokeWidth={2} />*/}
      {/*  <Zap size={16} color={color} strokeWidth={2} />*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraContainer: {
    position: 'absolute',
    top: 10,
    zIndex: 10,
  },
  scanArea: {
    width: 225,
    height: 225,
    borderWidth: 3,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  // Camera background - gives "camera open" feeling
  cameraBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark camera background
    zIndex: 1,
  },
  flowerContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    zIndex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  flowerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  photoFrame: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderWidth: 2,
    borderRadius: 16,
    borderStyle: 'dashed',
    zIndex: 3,
  },
  scanLine: {
    width: '90%',
    height: 3,
    position: 'absolute',
    left: '5%',
    zIndex: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20,
    right: 20,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    zIndex: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20,
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    zIndex: 8,
  },
  brainContainer: {
    position: 'absolute',
    top: 40,
    right: -10,
    zIndex: 6,
  },
  successContainer: {
    position: 'absolute',
    bottom: 45,
    left: 20,
    zIndex: 6,
  },
  checkContainer: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 7,
  },
  // PROMINENT "IDENTIFIED" badge - Positioned at the bottom center
  identifiedBadge: {
    position: 'absolute',
    bottom: -10,
    // left: '50%',
    // marginLeft: -50,
    zIndex: 10,
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  identifiedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  identifiedText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    zIndex: 7,
  },
  trophyContainer: {
    position: 'absolute',
    top: 75,
    left: 15,
    zIndex: 7,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 3,
  },
  sparkle: {
    position: 'absolute',
    zIndex: 9,
  },
  sparkle1: {
    top: 10,
    right: 10,
  },
  sparkle2: {
    bottom: 15,
    left: 15,
  },
  sparkle3: {
    top: 60,
    left: 5,
  },
  sparkle4: {
    bottom: 40,
    right: 10,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    gap: 8,
    zIndex: 6,
  },
});