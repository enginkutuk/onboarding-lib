import React from 'react';
export type Language = 'tr' | 'en';
interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => any;
}
export declare const LanguageProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useLanguage: () => LanguageContextType;
export {};
