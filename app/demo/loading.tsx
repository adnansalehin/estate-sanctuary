'use client'

import { Spinner } from '@/components/ui/spinner'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export default function DemoLoading() {
  const { isDarkTheme } = useTheme()

  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center transition-colors duration-300',
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    )}>
      <div className="text-center space-y-4">
        <Spinner className="h-8 w-8" />
        <p className="text-lg font-medium">Loading demo...</p>
      </div>
    </div>
  )
}