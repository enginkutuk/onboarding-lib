import React from 'react';
export type Theme = 'light' | 'dark' | 'system';
interface ThemeColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    subText: string;
    border: string;
    card: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
    purple: string;
    orange: string;
    teal: string;
}
interface ThemeContextType {
    theme: Theme;
    actualTheme: 'light' | 'dark';
    colors: ThemeColors;
    setTheme: (theme: Theme) => void;
}
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useTheme: () => ThemeContextType;
export {};
