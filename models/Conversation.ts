import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    required: true,
  },
  attachment: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

// Ensure virtual fields are serialized
ConversationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

// Add a virtual field for id that maps to _id
ConversationSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

export default Conversation;