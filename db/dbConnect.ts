import mongoose from 'mongoose';
import { MONGODB_URI, DB_NAME } from './env.config';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!DB_NAME) {
  throw new Error('Please define the DB_NAME environment variable inside .env.local');
}

async function dbConnect() {
  console.log('Connecting to MongoDB...', MONGODB_URI, DB_NAME);
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { 
      dbName: DB_NAME,
      // Add these options for better error handling
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`Mongoose connected to MongoDB (Database: ${DB_NAME})`);

    // Optional: Send a ping to confirm a successful connection
    await mongoose.connection.db?.command({ ping: 1 });
    console.log(`Pinged your deployment. You successfully connected to MongoDB!`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw new Error('Unable to connect to MongoDB');
  }
}

export default dbConnect;