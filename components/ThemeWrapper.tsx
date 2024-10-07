'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { OverviewClient } from './OverviewClient'
import { PropertyDetailsType, ActivityType, StageType } from '@/app/types'

type ThemeWrapperProps = {
  propertyDetails: PropertyDetailsType;
  initialActivities: ActivityType[];
  stages: StageType[];
}

export function ThemeWrapper({ propertyDetails, initialActivities, stages }: ThemeWrapperProps) {
  return (
    <ThemeProvider>
      <OverviewClient
        propertyDetails={propertyDetails}
        initialActivities={initialActivities}
        stages={stages}
      />
    </ThemeProvider>
  )
}