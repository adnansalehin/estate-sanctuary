'use client'

import { useState } from 'react'
import { PropertyGrid } from '@/components/PropertyGrid'
import { ThemeWrapper } from '@/components/ThemeWrapper'
import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'

type OverviewPageWrapperProps = { 
  properties: PropertyDetailsType[], 
  activities: ActivityType[], 
  stages: StageType[], 
  documents: DocumentType[], 
  conversations: ConversationType[] 
}

export function OverviewPageWrapper({ 
  properties, 
  activities, 
  stages, 
  documents, 
  conversations 
}: OverviewPageWrapperProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetailsType | null>(null);

  const handleRowClick = (property: PropertyDetailsType) => {
    setSelectedProperty(property);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Overview</h1>
      <PropertyGrid properties={properties} onRowClick={handleRowClick} />
      {selectedProperty ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Selected Property Details</h2>
          <ThemeWrapper
            propertyDetails={selectedProperty}
            initialActivities={activities}
            stages={stages}
            documents={documents}
            initialConversations={conversations}
          />
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500">
          Select a property from the grid above to view details.
        </div>
      )}
    </div>
  );
}
