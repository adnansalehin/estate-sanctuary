'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sun, Moon } from 'lucide-react'
import { PurchaseProgress } from '@/components/overview/PurchaseProgress'
import { ActivityStream } from '@/components/overview/ActivityStream'
import { Profile } from '@/components/overview/Profile'
import { useTheme } from '@/hooks/useTheme'
import { propertyDetails } from '@/utils/constants'

export default function OverviewPage() {
  const [currentStage, setCurrentStage] = useState(2)
  const { isDarkTheme, setIsDarkTheme } = useTheme()

  return (
    <div className={`container mx-auto p-4 space-y-6 ${isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-white text-[#024e52]'}`}>
      <style jsx global>{`
        :root {
          --primary: ${isDarkTheme ? '186 95% 16%' : '186 95% 32%'};
          --primary-foreground: 0 0% 100%;
        }
        body {
          background-color: ${isDarkTheme ? '#024e52' : '#ffffff'};
          color: ${isDarkTheme ? '#ffffff' : '#024e52'};
        }
      `}</style>
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{propertyDetails.address}</h1>
          <p className={isDarkTheme ? "text-gray-200" : "text-gray-600"}>{propertyDetails.price}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={isDarkTheme ? "bg-[#013639] text-white hover:bg-[#02292c] hover:text-gray-100" : "bg-white text-[#024e52] hover:bg-gray-100"}
        >
          {isDarkTheme ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>

      <PurchaseProgress 
        currentStage={currentStage} 
        onStageClick={setCurrentStage} 
        isDarkTheme={isDarkTheme} 
      />
      <ActivityStream 
        currentStage={currentStage} 
        isDarkTheme={isDarkTheme} 
      />
      <Profile 
        currentStage={currentStage} 
        isDarkTheme={isDarkTheme} 
      />
    </div>
  )
}