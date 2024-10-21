import dbConnect from '@/db/dbConnect'
import PropertyDetails from '@/models/PropertyDetails'
import Activity from '@/models/Activity'
import Stage from '@/models/Stage'
import Document from '@/models/Document'
import Conversation from '@/models/Conversation'
import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'
import { OverviewPageWrapper } from '@/components/OverviewPageWrapper'


async function getDocuments(): Promise<DocumentType[]> {
  try {
    await dbConnect();
    const documents = await Document.find().sort({ stage: 1 }).lean<DocumentType[]>();
    return documents.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

async function getPropertyDetails(): Promise<PropertyDetailsType | null> {
  try {
    await dbConnect();
    const propertyDetails = await PropertyDetails.findOne().lean<PropertyDetailsType>();
    return propertyDetails;
  } catch (error) {
    console.error('Error fetching property details:', error);
    return null;
  }
}

async function getActivities(): Promise<ActivityType[]> {
  try {
    await dbConnect();
    const activities = await Activity.find().sort({ date: -1 }).lean<ActivityType[]>();
    return activities.map((activity) => ({
      ...activity,
      _id: activity._id.toString(),
      date: activity.date.toString(),
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

async function getStages(): Promise<StageType[]> {
  try {
    await dbConnect();
    const stages = await Stage.find().sort({ order: 1 }).lean<StageType[]>();
    return stages.map((stage) => ({
      ...stage,
      _id: stage._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching stages:', error);
    return [];
  }
}

async function getConversations(): Promise<ConversationType[]> {
  try {
    await dbConnect();
    const conversations = await Conversation.find().sort({ date: -1 }).lean();
    return conversations.map((conv): ConversationType => ({
      _id: conv._id.toString(),
      sender: conv.sender,
      recipient: conv.recipient,
      message: conv.message,
      stage: conv.stage,
      date: conv.date,
    }));
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
}

export default async function OverviewPage() {
  try {
    const propertyDetails = await getPropertyDetails();
    const activities = await getActivities();
    const stages = await getStages();
    const documents = await getDocuments();
    const conversations = await getConversations();

    if (!propertyDetails) {
      return <div>No property details found or unable to connect to the database</div>;
    }

    return (
      <OverviewPageWrapper
        properties={[propertyDetails]} // Wrap in array as PropertyGrid expects an array
        activities={activities}
        stages={stages}
        documents={documents}
        conversations={conversations}
      />
    )
  } catch (error) {
    console.error('Error in OverviewPage:', error);
    return <div>An error occurred while loading the page. Please try again later.</div>;
  }
}
