'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { OverviewClient } from '@/components/OverviewClient'
import { PropertyDetailsType, ActivityType, StageType, DocumentType } from '@/app/types'

type ThemeWrapperProps = {
  propertyDetails: PropertyDetailsType;
  initialActivities: ActivityType[];
  stages: StageType[];
  documents: DocumentType[];
}

export function ThemeWrapper({ propertyDetails, initialActivities, stages, documents }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      <OverviewClient
        propertyDetails={propertyDetails}
        initialActivities={initialActivities}
        stages={stages}
        documents={documents}
      />
    </ThemeProvider>
  )
}