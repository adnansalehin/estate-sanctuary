import { Suspense } from 'react'
import { OverviewPageWrapper } from '@/components/OverviewPageWrapper'
import { properties as dummyProperties, activities as dummyActivities, stages as dummyStages, documents as dummyDocuments, conversations as dummyConversations } from '@/utils/constants'
import { fetchLiveData } from '@/app/actions'

export default async function DemoPage() {
  return (
    <Suspense fallback={
      <OverviewPageWrapper
        properties={dummyProperties}
        activities={dummyActivities}
        stages={dummyStages}
        documents={dummyDocuments}
        conversations={dummyConversations}
      />
    }>
      <DemoContent />
    </Suspense>
  )
}

async function DemoContent() {
  const liveData = await fetchLiveData()

  return (
    <OverviewPageWrapper
      properties={liveData?.properties || dummyProperties}
      activities={liveData?.activities || dummyActivities}
      stages={liveData?.stages || dummyStages}
      documents={liveData?.documents || dummyDocuments}
      conversations={liveData?.conversations || dummyConversations}
    />
  )
}