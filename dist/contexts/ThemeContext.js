import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
const lightColors = {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#E11D48',
    secondary: '#EC4899',
    text: '#1F2937',
    subText: '#6B7280',
    border: '#E5E7EB',
    card: '#ffffff',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    accent: '#8B5CF6',
    purple: '#A855F7',
    orange: '#F97316',
    teal: '#14B8A6',
};
const darkColors = {
    background: '#0F172A',
    surface: '#1E293B',
    primary: '#F87171',
    secondary: '#F472B6',
    text: '#F8FAFC',
    subText: '#94A3B8',
    border: '#334155',
    card: '#1E293B',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    accent: '#A78BFA',
    purple: '#C084FC',
    orange: '#FB923C',
    teal: '#2DD4BF',
};
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState('system');
    const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());
    const actualTheme = theme === 'system' ? (systemTheme || 'light') : theme;
    const colors = actualTheme === 'dark' ? darkColors : lightColors;
    useEffect(() => {
        // Load saved theme
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
                    setThemeState(savedTheme);
                }
            }
            catch (error) {
                console.error('Error loading theme:', error);
            }
        };
        loadTheme();
        // Listen to system theme changes
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemTheme(colorScheme);
        });
        return () => listener?.remove();
    }, []);
    const setTheme = async (newTheme) => {
        try {
            await AsyncStorage.setItem('theme', newTheme);
            setThemeState(newTheme);
        }
        catch (error) {
            console.error('Error saving theme:', error);
        }
    };
    return (_jsx(ThemeContext.Provider, { value: { theme, actualTheme, colors, setTheme }, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
