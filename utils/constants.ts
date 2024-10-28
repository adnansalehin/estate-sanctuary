import { PropertyDetailsType, ActivityType, StageType, DocumentType, ConversationType } from '@/app/types'

export const propertyDetails: PropertyDetailsType = {
  _id: "1",
  address: "123 Main St, Anytown, AN 12345",
  price: "$350,000"
}

// Add more dummy properties
export const properties: PropertyDetailsType[] = [
  propertyDetails,
  {
    _id: "2",
    address: "456 Oak Avenue, Springfield, SP 67890",
    price: "$425,000"
  },
  {
    _id: "3",
    address: "789 Pine Road, Rivertown, RT 54321",
    price: "$275,000"
  },
  {
    _id: "4",
    address: "321 Maple Lane, Hillside, HS 98765",
    price: "$550,000"
  }
]

export const stages: StageType[] = [
  { _id: "1", name: "Offer", complete: true, order: 1 },
  { _id: "2", name: "Enquiries", complete: true, order: 2 },
  { _id: "3", name: "Survey", complete: false, order: 3 },
  { _id: "4", name: "Exchange", complete: false, order: 4 },
  { _id: "5", name: "Completion", complete: false, order: 5 }
]

export const activities: ActivityType[] = [
  { _id: "1", date: "2024-01-28", event: "Seller's solicitor submitted request for water searches", type: "document", stage: 1 },
  { _id: "2", date: "2024-01-27", event: "Buyer's solicitor enquired about vague details on the land registry", type: "enquiry", stage: 1 },
  { _id: "3", date: "2024-01-26", event: "Survey report received", type: "document", stage: 2 },
  { _id: "4", date: "2024-01-25", event: "Buyer requested additional information about property boundaries", type: "enquiry", stage: 2 }
]

export const documents: DocumentType[] = [
  { _id: "1", name: "Proof of ID", uploader: "Buyer", stage: 1, icon: "user" },
  { _id: "2", name: "Property Information Form", uploader: "Seller", stage: 1, icon: "home" },
  { _id: "3", name: "Mortgage Agreement in Principle", uploader: "Buyer", stage: 2, icon: "file-text" },
  { _id: "4", name: "Survey Report", uploader: "Surveyor", stage: 2, icon: "briefcase" }
]

export const conversations: ConversationType[] = [
  { 
    _id: "1", 
    date: "2024-01-28", 
    sender: "Buyer", 
    recipient: "Seller", 
    message: "I'd like to make an offer on the property.", 
    stage: 1 
  },
  { 
    _id: "2", 
    date: "2024-01-27", 
    sender: "Seller", 
    recipient: "Buyer", 
    message: "Thank you for your offer. We'd like to counter with $345,000.", 
    stage: 1 
  },
  { 
    _id: "3", 
    date: "2024-01-26", 
    sender: "Buyer's Solicitor", 
    recipient: "Seller's Solicitor", 
    message: "We have some questions about the property boundaries.", 
    stage: 2 
  },
  { 
    _id: "4", 
    date: "2024-01-25", 
    sender: "Seller's Solicitor", 
    recipient: "Buyer's Solicitor", 
    message: "Here are the details about the property boundaries as requested.", 
    stage: 2 
  }
]