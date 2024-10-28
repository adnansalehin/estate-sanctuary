'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ 
      isDarkTheme, 
      setIsDarkTheme,
      isCollapsed,
      setIsCollapsed
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}