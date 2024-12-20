'use client'

import { useState } from 'react'
import { PurchaseProgress } from '@/components/overview/PurchaseProgress'
import { ActivityStream } from '@/components/overview/ActivityStream'
import { Profile } from '@/components/overview/Profile'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'

type OverviewClientProps = {
  propertyDetails: PropertyDetailsType;
  stages: StageType[];
  initialActivities: ActivityType[];
  documents: DocumentType[];
  initialConversations: ConversationType[];
}

export function OverviewClient({ propertyDetails, stages, initialActivities, documents, initialConversations }: OverviewClientProps) {
  const { isDarkTheme } = useTheme();
  const [currentStage, setCurrentStage] = useState(1);

  const handleStageClick = (stage: number) => {
    setCurrentStage(stage)
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-white text-[#024e52]'}`}>
      <div className="container mx-auto p-4 space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{propertyDetails.address}</h1>
            <p className={isDarkTheme ? "text-gray-200" : "text-gray-600"}>{propertyDetails.price}</p>
          </div>
          <ThemeToggle />
        </header>

        <PurchaseProgress 
          stages={stages}
          currentStage={currentStage}
          onStageClick={handleStageClick}
          isDarkTheme={isDarkTheme}
        />
        <ActivityStream 
          initialActivities={initialActivities}
          currentStage={currentStage}
          isDarkTheme={isDarkTheme}
          initialConversations={initialConversations}
        />
        <Profile 
          currentStage={currentStage}
          isDarkTheme={isDarkTheme} 
          documents={documents}
        />
      </div>
    </div>
  )
}
