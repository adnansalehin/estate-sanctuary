'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { OverviewClient } from '@/components/OverviewClient'
import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'

type ThemeWrapperProps = {
  propertyDetails: PropertyDetailsType;
  initialActivities: ActivityType[];
  stages: StageType[];
  documents: DocumentType[];
  initialConversations: ConversationType[];
}

export function ThemeWrapper({ propertyDetails, initialActivities, stages, documents, initialConversations }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      <OverviewClient
        propertyDetails={propertyDetails}
        initialActivities={initialActivities}
        stages={stages}
        documents={documents}
        initialConversations={initialConversations}
      />
    </ThemeProvider>
  )
}
