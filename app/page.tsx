import dbConnect from '@/db/dbConnect'
import PropertyDetails from '@/models/PropertyDetails'
import Activity from '@/models/Activity'
import Stage from '@/models/Stage'
import { ThemeWrapper } from '@/components/ThemeWrapper'
import { PropertyDetailsType, ActivityType, StageType } from '@/app/types'
import { MONGODB_URI, DB_NAME } from '@/db/env.config';

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

export default async function OverviewPage() {
  try {
    const propertyDetails = await getPropertyDetails();
    const activities = await getActivities();
    const stages = await getStages();

    if (!propertyDetails) {
      console.log('Connecting to MongoDB...', MONGODB_URI, DB_NAME);
      return <div>No property details found or unable to connect to the database</div>;
    }

    return (
      <ThemeWrapper
        propertyDetails={propertyDetails}
        initialActivities={activities}
        stages={stages}
      />
    )
  } catch (error) {
    console.error('Error in OverviewPage:', error);
    return <div>An error occurred while loading the page. Please try again later.</div>;
  }
}