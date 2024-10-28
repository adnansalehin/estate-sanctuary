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

    // Debug: Log raw data from database
    console.log('Raw DB Data:', {
      propertiesCount: properties.length,
      hasPropertyDetails: !!propertyDetails,
      activitiesCount: activities.length,
      stagesCount: stages.length,
      documentsCount: documents.length,
      conversationsCount: conversations.length
    })

    // Helper function to serialize MongoDB documents
    const serializeDocument = (doc: any) => {
      const serialized = JSON.parse(JSON.stringify(doc))
      if (serialized._id) {
        serialized.id = serialized._id
        delete serialized._id
      }
      if (serialized.__v !== undefined) {
        delete serialized.__v
      }
      return serialized
    }

    const serializedData = {
      properties: properties.map(serializeDocument),
      propertyDetails: propertyDetails ? serializeDocument(propertyDetails) : null,
      activities: activities.map(activity => ({
        ...serializeDocument(activity),
        date: new Date(activity.date).toISOString()
      })),
      stages: stages.map(serializeDocument),
      documents: documents.map(serializeDocument),
      conversations: conversations.map(conv => ({
        ...serializeDocument(conv),
        date: new Date(conv.date).toISOString()
      }))
    }

    // Debug: Log serialized data
    console.log('Serialized Data:', {
      propertiesCount: serializedData.properties.length,
      hasPropertyDetails: !!serializedData.propertyDetails,
      activitiesCount: serializedData.activities.length,
      stagesCount: serializedData.stages.length,
      documentsCount: serializedData.documents.length,
      conversationsCount: serializedData.conversations.length
    })

    return serializedData
  } catch (error) {
    console.error('Error fetching live data:', error)
    return null
  }
}