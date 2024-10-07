import { ReactNode } from 'react'

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
}

export type StageType = Stage

export type Conversation = {
  _id: string;
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