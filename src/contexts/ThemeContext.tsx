import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

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

const lightColors: ThemeColors = {
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

const darkColors: ThemeColors = {
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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  const actualTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = actualTheme === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    // Load saved theme
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeState(savedTheme as Theme);
        }
      } catch (error) {
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

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};