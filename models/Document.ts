import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  name: String,
  uploader: String,
  stage: Number,
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);