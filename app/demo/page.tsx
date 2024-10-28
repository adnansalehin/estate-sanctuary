import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { OverviewPageWrapper } from '@/components/OverviewPageWrapper'
import { properties as dummyProperties, activities as dummyActivities, stages as dummyStages, documents as dummyDocuments, conversations as dummyConversations } from '@/utils/constants'
import { fetchLiveData } from '@/app/actions'

function LoadingFallback() {
  return (
    <OverviewPageWrapper
      properties={dummyProperties}
      activities={dummyActivities}
      stages={dummyStages}
      documents={dummyDocuments}
      conversations={dummyConversations}
    />
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

export default function DemoPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <DemoContent />
      </Suspense>
    </ErrorBoundary>
  )
}