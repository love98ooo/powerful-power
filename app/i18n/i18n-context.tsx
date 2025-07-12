'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale } from './settings';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, namespace?: string) => string;
}

// 递归定义翻译对象类型
interface TranslationObject {
  [key: string]: string | TranslationObject;
}

type TranslationRecord = Record<string, TranslationObject>;

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<TranslationRecord>({});
  const [isInitialized, setIsInitialized] = useState(false);
  
  // 只在组件挂载时运行一次，检查localStorage中的语言设置
  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale;
    if (storedLocale && (storedLocale === 'en' || storedLocale === 'zh')) {
      setLocale(storedLocale);
    }
    setIsInitialized(true);
  }, []);

  // 加载翻译，依赖于locale变化
  useEffect(() => {
    if (!isInitialized) return; // 等待初始化完成再加载翻译
    
    const loadTranslations = async () => {
      try {
        const [commonTranslations, powerTranslations] = await Promise.all([
          import(`../../public/locales/${locale}/common.json`),
          import(`../../public/locales/${locale}/power.json`)
        ]);

        setTranslations({
          common: commonTranslations.default,
          power: powerTranslations.default
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = locale;
        
        // Store in localStorage for persistence
        localStorage.setItem('locale', locale);
      } catch (error) {
        console.error(`Failed to load translations for ${locale}`, error);
      }
    };
    
    loadTranslations();
  }, [locale, isInitialized]);

  // Translation function
  const t = (key: string, namespace: string = 'common'): string => {
    if (!translations[namespace]) {
      return key;
    }

    const keys = key.split('.');
    let value: string | TranslationObject = translations[namespace];
    
    for (const k of keys) {
      if (typeof value === 'string') {
        return key; // Key path too long, early return
      }
      value = value[k] as string | TranslationObject;
      if (value === undefined) return key;
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 