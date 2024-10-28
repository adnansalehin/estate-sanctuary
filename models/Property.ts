import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

export default Property;