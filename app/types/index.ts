import { ReactNode } from 'react'

export type Activity = {
  date: string;
  event: string;
  type: 'document' | 'enquiry';
  stage: number;
}

export type Document = {
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
  id: number;
  date: string;
  sender: string;
  recipient: string;
  message: string;
  stage: number;
  attachment?: string;
}
