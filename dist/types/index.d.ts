export type OnboardingStep = 'welcome' | 'scan' | 'permissions' | 'history' | 'rating' | 'subscription';
export interface OnboardingConfig {
    onboarding: {
        settings: {
            showSubscription: boolean;
        };
        navigation: {
            dots: {
                show: boolean;
                activeColor: string;
                inactiveColor: string;
            };
        };
        steps: {
            order: OnboardingStep[];
            welcome: WelcomeStepConfig;
            scan: ScanStepConfig;
            permissions: PermissionsStepConfig;
            history: HistoryStepConfig;
            rating: RatingStepConfig;
            subscription: SubscriptionStepConfig;
        };
    };
}
export interface WelcomeStepConfig {
    id: string;
    gradientColors: {
        light: string[];
        dark: string[];
    };
    content: {
        logo: {
            width: number;
            height: number;
            borderRadius: number;
            resizeMode: string;
        };
        title: string;
        subtitle: string;
        description: string;
        features: string[];
    };
    navigation: NavigationConfig;
}
export interface ScanStepConfig {
    id: string;
    content: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
    };
    navigation: NavigationConfig;
}
export interface PermissionsStepConfig {
    id: string;
    icon: IconConfig;
    content: {
        title: string;
        subtitle: string;
        securityMessage: string;
    };
    permissionsList: PermissionItem[];
    navigation: NavigationConfig;
}
export interface HistoryStepConfig {
    id: string;
    icon: IconConfig;
    content: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
    };
    navigation: NavigationConfig;
}
export interface RatingStepConfig {
    id: string;
    icon: IconConfig & {
        fill?: boolean;
    };
    content: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
    };
    navigation: NavigationConfig;
}
export interface SubscriptionStepConfig {
    id: string;
    icon: IconConfig;
    gradientColors: {
        light: string[];
        dark: string[];
    };
    content: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
        pricing: {
            yearly: {
                title: string;
                price: string;
                discount: string;
            };
        };
    };
    navigation: NavigationConfig;
}
export interface IconConfig {
    type: string;
    size: number;
    strokeWidth: number;
    color: string;
}
export interface PermissionItem {
    icon: IconConfig;
    title: string;
    description: string;
}
export interface NavigationConfig {
    next?: ButtonConfig;
    back?: ButtonConfig;
    skip?: ButtonConfig;
}
export interface ButtonConfig {
    text: string;
    icon?: string;
    show: boolean;
    style: {
        backgroundColor: string;
    };
    textStyle: {
        color: string;
        fontFamily?: string;
    };
}
export interface OnboardingProps {
    config?: OnboardingConfig;
    logoSource?: any;
    onComplete?: () => void;
    onStepChange?: (step: OnboardingStep, index: number) => void;
    customTheme?: any;
    customTranslations?: any;
}
export interface ThemeColors {
    background: string;
    text: string;
    subText: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    purple: string;
    card: string;
    surface: string;
    border: string;
}
