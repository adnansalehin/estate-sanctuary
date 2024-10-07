import { Schema } from 'mongoose';

export const StageSchema = new Schema({
  name: { type: String, required: true },
  complete: { type: Boolean, required: true },
  order: { type: Number, required: true }
});

export const ActivitySchema = new Schema({
  date: { type: Date, required: true },
  event: { type: String, required: true },
  type: { type: String, required: true },
  stage: { type: Number, required: true }
});

export const DocumentSchema = new Schema({
  name: { type: String, required: true },
  uploader: { type: String, required: true },
  stage: { type: Number, required: true },
  icon: { type: String, required: true }
});

export const ConversationSchema = new Schema({
  date: { type: Date, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  stage: { type: Number, required: true }
});

export const PropertyDetailsSchema = new Schema({
  address: { type: String, required: true },
  price: { type: String, required: true }
});