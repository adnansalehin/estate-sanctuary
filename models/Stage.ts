import mongoose from 'mongoose';

const StageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Stage || mongoose.model('Stage', StageSchema);