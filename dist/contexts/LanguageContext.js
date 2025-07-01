import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../translations';
const LanguageContext = createContext(undefined);
export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState('tr');
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('language');
                if (savedLanguage && ['tr', 'en'].includes(savedLanguage)) {
                    setLanguageState(savedLanguage);
                }
            }
            catch (error) {
                console.error('Error loading language:', error);
            }
        };
        loadLanguage();
    }, []);
    const setLanguage = async (newLanguage) => {
        try {
            await AsyncStorage.setItem('language', newLanguage);
            setLanguageState(newLanguage);
        }
        catch (error) {
            console.error('Error saving language:', error);
        }
    };
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            }
            else {
                return key; // Return key if translation not found
            }
        }
        return value !== undefined ? value : key;
    };
    return (_jsx(LanguageContext.Provider, { value: { language, setLanguage, t }, children: children }));
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
