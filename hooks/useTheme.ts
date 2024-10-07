'use client'

import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkTheme) {
      root.classList.add('dark')
      root.style.setProperty('--primary', '186 95% 16%')
    } else {
      root.classList.remove('dark')
      root.style.setProperty('--primary', '186 95% 32%')
    }
  }, [isDarkTheme])

  return { isDarkTheme, setIsDarkTheme }
}