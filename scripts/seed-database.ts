import { config } from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'
import Property from '../models/Property'
import PropertyDetails from '../models/PropertyDetails'
import Activity from '../models/Activity'
import Stage from '../models/Stage'
import Document from '../models/Document'
import Conversation from '../models/Conversation'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME
if (!DB_NAME) {
  throw new Error('Please define the DB_NAME environment variable inside .env.local')
}

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Type assertion to tell TypeScript that MONGODB_URI is definitely a string at this point
const uri: string = MONGODB_URI as string
const dbName: string = DB_NAME as string

// Data to seed from constants.ts
const properties = [
  {
    address: "123 Main St, Anytown, AN 12345",
    price: "$350,000"
  },
  {
    address: "456 Oak Avenue, Springfield, SP 67890",
    price: "$425,000"
  },
  {
    address: "789 Pine Road, Rivertown, RT 54321",
    price: "$275,000"
  },
  {
    address: "321 Maple Lane, Hillside, HS 98765",
    price: "$550,000"
  }
]

const stages = [
  { name: "Offer", complete: true, order: 1 },
  { name: "Enquiries", complete: true, order: 2 },
  { name: "Survey", complete: false, order: 3 },
  { name: "Exchange", complete: false, order: 4 },
  { name: "Completion", complete: false, order: 5 }
]

const activities = [
  { date: new Date("2024-01-28"), event: "Seller's solicitor submitted request for water searches", type: "document", stage: 1 },
  { date: new Date("2024-01-27"), event: "Buyer's solicitor enquired about vague details on the land registry", type: "enquiry", stage: 1 },
  { date: new Date("2024-01-26"), event: "Survey report received", type: "document", stage: 2 },
  { date: new Date("2024-01-25"), event: "Buyer requested additional information about property boundaries", type: "enquiry", stage: 2 }
]

const documents = [
  { name: "Proof of ID", uploader: "Buyer", stage: 1, icon: "user" },
  { name: "Property Information Form", uploader: "Seller", stage: 1, icon: "home" },
  { name: "Mortgage Agreement in Principle", uploader: "Buyer", stage: 2, icon: "file-text" },
  { name: "Survey Report", uploader: "Surveyor", stage: 2, icon: "briefcase" }
]

const conversations = [
  { 
    date: new Date("2024-01-28"),
    sender: "Buyer",
    recipient: "Seller",
    message: "I'd like to make an offer on the property.",
    stage: 1
  },
  {
    date: new Date("2024-01-27"),
    sender: "Seller",
    recipient: "Buyer",
    message: "Thank you for your offer. We'd like to counter with $345,000.",
    stage: 1
  },
  {
    date: new Date("2024-01-26"),
    sender: "Buyer's Solicitor",
    recipient: "Seller's Solicitor",
    message: "We have some questions about the property boundaries.",
    stage: 2
  },
  {
    date: new Date("2024-01-25"),
    sender: "Seller's Solicitor",
    recipient: "Buyer's Solicitor",
    message: "Here are the details about the property boundaries as requested.",
    stage: 2
  }
]

async function seedDatabase() {
  try {
    // Connect to MongoDB using the typed uri
    await mongoose.connect(uri,{ 
        dbName: dbName,
        // Add these options for better error handling
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
    console.log('Connected to MongoDB')

    // Clear existing data
    await Promise.all([
      Property.deleteMany({}),
      PropertyDetails.deleteMany({}),
      Activity.deleteMany({}),
      Stage.deleteMany({}),
      Document.deleteMany({}),
      Conversation.deleteMany({})
    ])
    console.log('Cleared existing data')

    // Seed new data
    await Promise.all([
      Property.insertMany(properties),
      PropertyDetails.create(properties[0]),
      Activity.insertMany(activities),
      Stage.insertMany(stages),
      Document.insertMany(documents),
      Conversation.insertMany(conversations)
    ])
    console.log('Seeded database successfully')

    // Verify data
    const counts = await Promise.all([
      Property.countDocuments(),
      PropertyDetails.countDocuments(),
      Activity.countDocuments(),
      Stage.countDocuments(),
      Document.countDocuments(),
      Conversation.countDocuments()
    ])
    
    console.log('Collection counts:', {
      properties: counts[0],
      propertyDetails: counts[1],
      activities: counts[2],
      stages: counts[3],
      documents: counts[4],
      conversations: counts[5]
    })

  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

// Run the seed function
seedDatabase().catch(console.error) 