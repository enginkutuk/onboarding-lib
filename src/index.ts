// Main component
export { default as OnboardingScreen } from './components/OnboardingScreen';

// Individual components
export { default as AnimatedFlower } from './components/AnimatedFlower';
export { default as ScanAnimation } from './components/ScanAnimation';
export { default as PermissionCard } from './components/PermissionCard';
export { default as FeatureList } from './components/FeatureList';
export { default as RatingStars } from './components/RatingStars';

// Contexts
export { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Hooks
export { useFrameworkReady } from './hooks/useFrameworkReady';

// Types
export * from './types';

// Default config
export { default as defaultOnboardingConfig } from './onboardingConfig.json'; 