import mongoose from 'mongoose';

const AgentEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

const AgentEmail = mongoose.models.AgentEmail || 
  mongoose.model('AgentEmail', AgentEmailSchema);

export default AgentEmail; 