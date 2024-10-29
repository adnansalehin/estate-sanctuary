'use server'

import dbConnect from '@/db/dbConnect'
import AgentEmail from '@/models/AgentEmail'
import { z } from 'zod'

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Invalid email address')
})

export async function subscribeEmail(email: string) {
  try {
    // Validate email
    const validatedData = emailSchema.parse({ email })
    
    // Connect to database
    await dbConnect()
    
    // Check if email already exists
    const existingEmail = await AgentEmail.findOne({ email: validatedData.email })
    if (existingEmail) {
      return { success: false, message: 'Email already registered' }
    }
    
    // Create new email record
    const newEmail = new AgentEmail({
      email: validatedData.email,
      signupDate: new Date(),
      status: 'active'
    })
    
    await newEmail.save()
    
    return { success: true, message: 'Successfully subscribed' }
  } catch (error) {
    console.error('Error subscribing email:', error)
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Invalid email format' }
    }
    return { success: false, message: 'Failed to subscribe. Please try again.' }
  }
} 