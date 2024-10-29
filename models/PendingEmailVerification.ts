import mongoose from 'mongoose';
import crypto from 'crypto';

const PendingEmailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationToken: {
    type: String,
    required: true,
    default: () => crypto.randomBytes(32).toString('hex') // Set default value
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60, // Document expires after 24 hours
  },
});

// Generate verification token before validation
PendingEmailVerificationSchema.pre('validate', function(next) {
  if (!this.verificationToken) {
    this.verificationToken = crypto.randomBytes(32).toString('hex');
  }
  next();
});

const PendingEmailVerification = mongoose.models.PendingEmailVerification || 
  mongoose.model('PendingEmailVerification', PendingEmailVerificationSchema);

export default PendingEmailVerification; 