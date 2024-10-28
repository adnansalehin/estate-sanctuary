import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { fetchLiveData } from '@/app/actions'
import { DemoContent, LoadingFallback } from '@/app/demo/components'

// Server component that handles data fetching
async function DemoPage() {
  // Fetch data on the server
  const liveData = await fetchLiveData()
  
  // Transform dates if live data is available
  const transformedData = liveData ? {
    ...liveData,
    activities: liveData.activities.map(activity => ({
      ...activity,
      date: new Date(activity.date).toISOString()
    })),
    conversations: liveData.conversations.map(conversation => ({
      ...conversation,
      date: new Date(conversation.date).toISOString()
    }))
  } : null

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <DemoContent data={transformedData} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default DemoPage