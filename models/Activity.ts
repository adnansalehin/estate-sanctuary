import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['document', 'enquiry'],
  },
  stage: {
    type: Number,
    required: true,
  },
});

const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

export default Activity;