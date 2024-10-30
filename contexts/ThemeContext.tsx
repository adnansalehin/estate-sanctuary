'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themeConfig } from '@/lib/theme-config'

type ThemeContextType = {
  isDarkTheme: boolean
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  theme: typeof themeConfig
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.add('dark')
    
    if (!isDarkTheme) {
      root.classList.remove('dark')
    }
  }, [isDarkTheme])

  return (
    <ThemeContext.Provider value={{ 
      isDarkTheme, 
      setIsDarkTheme,
      isCollapsed,
      setIsCollapsed,
      theme: themeConfig
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}