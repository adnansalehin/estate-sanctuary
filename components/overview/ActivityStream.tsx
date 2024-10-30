'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Calendar } from 'lucide-react'
import { DocumentUpload } from "@/components/overview/DocumentUpload"
import { ThreadList } from "@/components/overview/ThreadList"
import { Activity, ActivityStreamProps, ActivityListProps } from '@/app/types'
import { cn } from '@/lib/utils'

export function ActivityStream({ initialActivities, currentStage, isDarkTheme, initialConversations }: ActivityStreamProps) {
  const [activities] = useState<Activity[]>(initialActivities);

  const filteredActivities = activities.filter(activity => activity.stage <= currentStage + 1)

  return (
    <Card className={isDarkTheme ? "bg-[#013639] text-white" : "bg-white text-[#024e52]"}>
      <CardHeader>
        <CardTitle>Activity Stream</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className={cn(
            "grid w-full grid-cols-4",
            isDarkTheme 
              ? "bg-[#024e52]/50" 
              : "bg-gray-100"
          )}>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="thread">Thread</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <ActivityList activities={filteredActivities} isDarkTheme={isDarkTheme} />
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            <div data-testid="document-upload">
              <DocumentUpload isDarkTheme={isDarkTheme} />
            </div>
            <ActivityList 
              activities={filteredActivities.filter(activity => activity.type === 'document')} 
              isDarkTheme={isDarkTheme}
            />
          </TabsContent>
          <TabsContent value="enquiries" className="mt-4">
            <ActivityList 
              activities={filteredActivities.filter(activity => activity.type === 'enquiry')} 
              isDarkTheme={isDarkTheme}
            />
          </TabsContent>
          <TabsContent value="thread" className="mt-4">
            <ThreadList currentStage={currentStage} isDarkTheme={isDarkTheme} initialConversations={initialConversations} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ActivityList({ activities, isDarkTheme }: ActivityListProps) {
  return (
    <ul className="space-y-4">
      {activities.map((activity, index) => (
        <li key={activity._id?.toString() || `activity-${index}`} className={`flex items-start gap-4 p-4 border ${isDarkTheme ? 'border-gray-600' : 'border-gray-200'} rounded-lg`}>
          {activity.type === 'document' && <FileText className="w-6 h-6 text-white" />}
          {activity.type === 'enquiry' && <Users className="w-6 h-6 text-white" />}
          <div className="flex-1">
            <p className="font-medium">{activity.event}</p>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-1`}>
              <Calendar className="w-4 h-4" />
              {new Date(activity.date).toLocaleDateString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}