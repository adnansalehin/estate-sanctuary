import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark' : 'light'
  }, [isDarkTheme])

  return { isDarkTheme, setIsDarkTheme }
}