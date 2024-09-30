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
  name: string;
  complete: boolean;
}

export type Conversation = {
  id: number;
  date: string;
  sender: string;
  recipient: string;
  message: string;
  stage: number;
  attachment?: string;
}