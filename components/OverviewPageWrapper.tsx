'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ThemeWrapper } from '@/components/ThemeWrapper'
import { useTheme } from '@/contexts/ThemeContext'
import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'

type OverviewPageWrapperProps = { 
  properties: PropertyDetailsType[]
  activities: ActivityType[]
  stages: StageType[]
  documents: DocumentType[]
  conversations: ConversationType[]
}

export function OverviewPageWrapper({ 
  properties, 
  activities, 
  stages, 
  documents, 
  conversations 
}: OverviewPageWrapperProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetailsType | null>(properties[0] || null)
  const { isDarkTheme, isCollapsed } = useTheme()

  const handlePropertySelect = (property: PropertyDetailsType) => {
    setSelectedProperty(property)
  }

  return (
    <div className="flex pt-14">
      <Sidebar
        properties={properties}
        selectedProperty={selectedProperty}
        onPropertySelect={handlePropertySelect}
        isDarkTheme={isDarkTheme}
      />
      
      <main 
        className={`flex-1 min-h-screen transition-all duration-300 ${isDarkTheme ? 'bg-[#024e52]' : 'bg-gray-50'}`} 
        style={{ marginLeft: isCollapsed ? '4rem' : '16rem' }}
      >
        {selectedProperty ? (
          <div className="p-6">
            <ThemeWrapper
              propertyDetails={selectedProperty}
              initialActivities={activities}
              stages={stages}
              documents={documents}
              initialConversations={conversations}
            />
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center text-center p-6">
            <div className={`${isDarkTheme ? 'text-white' : 'text-gray-500'}`}>
              <h2 className="text-xl font-semibold mb-2">No Property Selected</h2>
              <p>Please select a property from the sidebar to view its details.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}