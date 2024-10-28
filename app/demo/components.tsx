'use client'

import { OverviewPageWrapper } from '@/components/OverviewPageWrapper'
import { properties as dummyProperties, activities as dummyActivities, stages as dummyStages, documents as dummyDocuments, conversations as dummyConversations } from '@/utils/constants'

export const LoadingFallback = () => (
  <div key="loading-fallback">
    <OverviewPageWrapper
      properties={dummyProperties}
      activities={dummyActivities}
      stages={dummyStages}
      documents={dummyDocuments}
      conversations={dummyConversations}
    />
  </div>
)

type DemoContentProps = { 
  data: {
    properties: typeof dummyProperties,
    activities: typeof dummyActivities,
    stages: typeof dummyStages,
    documents: typeof dummyDocuments,
    conversations: typeof dummyConversations
  } | null 
}

export const DemoContent = ({ data }: DemoContentProps) => {
  // Use live data if available, otherwise fall back to dummy data
  const finalData = data ?? {
    properties: dummyProperties,
    activities: dummyActivities,
    stages: dummyStages,
    documents: dummyDocuments,
    conversations: dummyConversations
  }

  return (
    <OverviewPageWrapper
      properties={finalData.properties}
      activities={finalData.activities}
      stages={finalData.stages}
      documents={finalData.documents}
      conversations={finalData.conversations}
    />
  )
} 