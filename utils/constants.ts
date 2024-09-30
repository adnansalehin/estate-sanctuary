import { Activity, Document, Stage, Conversation } from '@/types'

export const propertyDetails = {
  address: "123 Main St, Anytown, AN 12345",
  price: "$350,000",
}

export const stages: Stage[] = [
  { name: "Offer", complete: true },
  { name: "Enquiries", complete: true },
  { name: "Survey", complete: false },
  { name: "Exchange", complete: false },
  { name: "Completion", complete: false }
]

export const activities: Activity[] = [
  { date: "2023-09-28", event: "Seller's solicitor submitted request for water searches", type: "document", stage: 1 },
  { date: "2023-09-27", event: "Buyer's solicitor enquired about vague details on the land registry", type: "enquiry", stage: 1 },
  { date: "2023-09-26", event: "Survey report received", type: "document", stage: 2 },
  { date: "2023-09-25", event: "Buyer requested additional information about property boundaries", type: "enquiry", stage: 2 },
]

export const documents: Document[] = [
  { name: "Proof of ID", uploader: "Buyer", stage: 1, icon: "user" },
  { name: "Property Information Form", uploader: "Seller", stage: 1, icon: "home" },
  { name: "Mortgage Agreement in Principle", uploader: "Buyer", stage: 2, icon: "user" },
  { name: "Survey Report", uploader: "Surveyor", stage: 2, icon: "briefcase" },
]

export const initialConversations: Conversation[] = [
  { id: 1, date: "2023-09-28", sender: "Buyer", recipient: "Seller", message: "I'd like to make an offer on the property.", stage: 1 },
  { id: 2, date: "2023-09-27", sender: "Seller", recipient: "Buyer", message: "Thank you for your offer. We'd like to counter with...", stage: 1 },
  { id: 3, date: "2023-09-26", sender: "Buyer's Solicitor", recipient: "Seller's Solicitor", message: "We have some questions about the property boundaries.", stage: 2 },
  { id: 4, date: "2023-09-25", sender: "Seller's Solicitor", recipient: "Buyer's Solicitor", message: "Here are the details about the property boundaries...", stage: 2 },
]