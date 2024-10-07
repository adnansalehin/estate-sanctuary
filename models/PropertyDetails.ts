import mongoose from 'mongoose';

const PropertyDetailsSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const PropertyDetails = mongoose.models.PropertyDetails || mongoose.model('PropertyDetails', PropertyDetailsSchema);

export default PropertyDetails;