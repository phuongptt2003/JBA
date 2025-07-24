import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

const translations = {
  en: {
    welcome: 'Welcome',
    personalInfo: 'Personal information',
    notification: 'Notification',
    changePassword: 'Change password',
    contactUs: 'Contact us',
    changeLanguage: 'Change Language',
    privacyPolicy: 'Privacy policy',
    signOut: 'Sign Out',
    english: 'English',
    vietnamese: 'Vietnamese',
  },
  vi: {
    welcome: 'Chào mừng',
    personalInfo: 'Thông tin cá nhân',
    notification: 'Thông báo',
    changePassword: 'Đổi mật khẩu',
    contactUs: 'Liên hệ',
    changeLanguage: 'Đổi ngôn ngữ',
    privacyPolicy: 'Chính sách bảo mật',
    signOut: 'Đăng xuất',
    english: 'Tiếng Anh',
    vietnamese: 'Tiếng Việt',
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'vi' : 'en'));
  const t = (key: string) => translations[language][key as keyof typeof translations.en] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};