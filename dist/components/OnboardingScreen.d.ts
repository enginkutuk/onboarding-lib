import { OnboardingProps, ThemeColors } from '../types';
interface OnboardingScreenProps extends OnboardingProps {
    themeColors: ThemeColors;
    actualTheme: 'light' | 'dark';
    t: (key: string) => string;
}
export default function OnboardingScreen({ config, logoSource, onComplete, onStepChange, themeColors, actualTheme, t, }: OnboardingScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
