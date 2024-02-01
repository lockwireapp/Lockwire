import { I18n } from 'i18n-js';
import React, { createContext, useContext } from 'react';

/**
 * TODO add language switch support
 * TODO add lazy load translations
 */

const translations = {
    en: {},
};
const i18n = new I18n(translations);
const I18nContext = createContext(i18n);

export const useI18n = () => {
    return useContext(I18nContext);
};

export const useTemplateTranslation = () => {
    const t = useI18n();
    return ([defaultValue]: TemplateStringsArray) => t.translate(defaultValue, { defaultValue });
};

export const useTranslate = () => {
    const t = useI18n();
    return (value: string) => t.translate(value, { defaultValue: value });
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};
