'use server'

import dbConnect from '@/db/dbConnect'
import Property from '@/models/Property'
import PropertyDetails from '@/models/PropertyDetails'
import Activity from '@/models/Activity'
import Stage from '@/models/Stage'
import Document from '@/models/Document'
import Conversation from '@/models/Conversation'

export async function fetchLiveData() {
  try {
    await dbConnect()
    
    const [properties, propertyDetails, activities, stages, documents, conversations] = await Promise.all([
      Property.find().lean(),
      PropertyDetails.findOne().lean(),
      Activity.find().sort({ date: -1 }).lean(),
      Stage.find().sort({ order: 1 }).lean(),
      Document.find().sort({ stage: 1 }).lean(),
      Conversation.find().sort({ date: -1 }).lean()
    ])

    return {
      properties: properties.map((prop: any) => ({
        ...prop,
        _id: prop._id.toString()
      })),
      propertyDetails: propertyDetails ? {
        ...propertyDetails,
        // _id: propertyDetails._id.toString()
      } : null,
      activities: activities.map((activity: any) => ({
        ...activity,
        _id: activity._id.toString(),
        date: activity.date.toString()
      })),
      stages: stages.map((stage: any) => ({
        ...stage,
        _id: stage._id.toString()
      })),
      documents: documents.map((doc: any) => ({
        ...doc,
        _id: doc._id.toString()
      })),
      conversations: conversations.map((conv: any) => ({
        _id: conv._id.toString(),
        sender: conv.sender,
        recipient: conv.recipient,
        message: conv.message,
        stage: conv.stage,
        date: conv.date.toString()
      }))
    }
  } catch (error) {
    console.error('Error fetching live data:', error)
    return null
  }
}