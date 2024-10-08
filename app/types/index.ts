import { ReactNode } from 'react'


export type ActivityListProps = {
  activities: Activity[];
  isDarkTheme: boolean;
}

export type ActivityStreamProps = {
  initialActivities: Activity[];
  currentStage: number;
  isDarkTheme: boolean;
}

export type Activity = {
  _id: string;
  date: string;
  event: string;
  type: 'document' | 'enquiry';
  stage: number;
}

export type Document = {
  _id: string;
  name: string;
  uploader: string;
  stage: number;
  icon: ReactNode;
}

export type Stage = {
  _id: string;
  name: string;
  complete: boolean;
  order: number;
}

export type StageType = Stage

export type Conversation = {
  id: number;
  date: string;
  sender: string;
  recipient: string;
  message: string;
  stage: number;
  attachment?: string;
}

export type PropertyDetails = {
  _id: string;
  address: string;
  price: string;
}

export type ActivityType = Activity

export type DocumentType = Document

export type PropertyDetailsType = PropertyDetails