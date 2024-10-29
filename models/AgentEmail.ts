import mongoose from 'mongoose';

const AgentEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active',
  }
});

const AgentEmail = mongoose.models.AgentEmail || mongoose.model('AgentEmail', AgentEmailSchema);

export default AgentEmail; 