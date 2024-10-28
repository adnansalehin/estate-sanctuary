'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ThemeWrapper } from '@/components/ThemeWrapper'
import { useTheme } from '@/contexts/ThemeContext'
import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'
import { fetchLiveData } from '@/app/actions'

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
  const [data, setData] = useState({
    properties,
    activities,
    stages,
    documents,
    conversations
  })
  const { isDarkTheme, isCollapsed } = useTheme()

  useEffect(() => {
    // Fetch live data and update state
    const updateLiveData = async () => {
      const liveData = await fetchLiveData()
      if (liveData) {
        setData(liveData)
        // Update selected property if it exists in new data
        if (selectedProperty) {
          const updatedProperty = liveData.properties.find(p => p._id === selectedProperty._id)
          if (updatedProperty) {
            setSelectedProperty(updatedProperty)
          }
        }
      }
    }

    updateLiveData()
  }, [selectedProperty])

  const handlePropertySelect = (property: PropertyDetailsType) => {
    setSelectedProperty(property)
  }

  return (
    <div className="flex pt-14">
      <Sidebar
        properties={data.properties}
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
              initialActivities={data.activities}
              stages={data.stages}
              documents={data.documents}
              initialConversations={data.conversations}
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