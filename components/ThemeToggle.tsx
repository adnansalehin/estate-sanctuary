'use client'

import { Button } from "@/components/ui/button"
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { isDarkTheme, setIsDarkTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={isDarkTheme ? "bg-[#013639] text-white hover:bg-[#02292c] hover:text-gray-100" : "bg-white text-[#024e52] hover:bg-gray-100"}
    >
      {isDarkTheme ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}