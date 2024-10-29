'use server'

import dbConnect from '@/db/dbConnect'
import AgentEmail from '@/models/AgentEmail'
import PendingEmailVerification from '@/models/PendingEmailVerification'
import { z } from 'zod'
import { generateWelcomeEmail } from '@/emails/welcome-template'
import { sendEmail } from '@/lib/email-service'

// Enhanced email validation schema with more specific rules
const emailSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine(email => email.includes('.'), 'Email must contain a domain')
    .refine(email => {
      const [localPart, domain] = email.split('@')
      return (
        localPart.length <= 64 && // Local part max length
        domain.length <= 255 && // Domain max length
        !localPart.startsWith('.') && // No leading dot
        !localPart.endsWith('.') // No trailing dot
      )
    }, 'Invalid email format')
    .transform(email => email.toLowerCase().trim())
})

export async function subscribeEmail(email: string) {
  console.log('\n=== Starting Email Subscription Process ===')
  console.log('Raw email input:', email)
  
  try {
    // Validate email with detailed error handling
    console.log('Validating email format...')
    const validationResult = emailSchema.safeParse({ email })
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors
      console.log('Format validation failed:', errors)
      return { 
        success: false, 
        message: errors[0].message 
      }
    }
    
    const validatedEmail = validationResult.data.email
    console.log('Email format validated successfully:', validatedEmail)
    
    // Connect to database
    console.log('Connecting to database...')
    await dbConnect()
    console.log('Database connected successfully')
    
    // Check both collections in parallel for existing email
    console.log('Checking for existing registrations...')
    const [existingVerified, existingPending] = await Promise.all([
      AgentEmail.findOne({ email: validatedEmail }),
      PendingEmailVerification.findOne({ email: validatedEmail })
    ])

    // Handle existing registrations
    if (existingVerified) {
      console.log('Email already verified:', validatedEmail)
      return { 
        success: false, 
        message: 'This email is already registered and verified' 
      }
    }

    if (existingPending) {
      console.log('Email has pending verification:', validatedEmail)
      const timeSinceCreation = Date.now() - existingPending.createdAt.getTime()
      const minutesRemaining = Math.ceil((24 * 60 * 60 * 1000 - timeSinceCreation) / (60 * 1000))
      
      return { 
        success: false, 
        message: `This email already has a pending verification. Please check your inbox or try again in ${minutesRemaining} minutes.` 
      }
    }
    
    // Create new pending verification
    console.log('Creating new pending verification')
    const pendingVerification = new PendingEmailVerification({
      email: validatedEmail
    })
    await pendingVerification.save()
    
    console.log('Verification token:', pendingVerification.verificationToken)
    
    // Generate verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${pendingVerification.verificationToken}`
    console.log('Verification URL:', verificationUrl)
    
    // Send verification email
    console.log('Sending verification email...')
    const emailSent = await sendEmail(
      validatedEmail,
      'Verify your email address',
      generateWelcomeEmail(verificationUrl)
    )
    
    if (!emailSent) {
      console.error('Failed to send verification email')
      // Clean up pending verification if email fails
      await PendingEmailVerification.deleteOne({ _id: pendingVerification._id })
      throw new Error('Failed to send verification email')
    }
    
    console.log('Verification email sent successfully')
    console.log('=== Email Subscription Process Completed ===\n')
    
    return { 
      success: true, 
      message: 'Please check your email to verify your subscription' 
    }
  } catch (error) {
    console.error('\n=== Error in Email Subscription Process ===')
    console.error('Error details:', error)
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => e.message).join(', ')
      console.error('Validation error:', errorMessage)
      return { success: false, message: errorMessage }
    }
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Stack trace:', error.stack)
    }
    console.error('=== Error Processing Completed ===\n')
    return { 
      success: false, 
      message: 'Failed to process subscription. Please try again.' 
    }
  }
}

export async function verifyEmail(token: string) {
  console.log('\n=== Starting Email Verification Process ===')
  console.log('Token:', token)
  
  try {
    await dbConnect()
    console.log('Database connected for verification')
    
    // Find pending verification
    console.log('Searching for pending verification...')
    const pendingVerification = await PendingEmailVerification.findOne({ 
      verificationToken: token 
    })
    
    if (!pendingVerification) {
      console.log('No pending verification found for token:', token)
      return { 
        success: false, 
        message: 'Invalid or expired verification link' 
      }
    }
    
    console.log('Found pending verification:', pendingVerification)
    
    // Create verified email entry
    console.log('Creating new verified email entry...')
    const newEmail = new AgentEmail({
      email: pendingVerification.email,
      signupDate: new Date(),
      status: 'active'
    })
    
    console.log('Saving verified email...')
    await newEmail.save()
    console.log('Email verified and saved:', pendingVerification.email)
    
    // Delete pending verification
    console.log('Deleting pending verification...')
    const deleteResult = await PendingEmailVerification.deleteOne({ 
      _id: pendingVerification._id 
    })
    console.log('Delete result:', deleteResult)
    
    console.log('=== Email Verification Process Completed ===\n')
    return { 
      success: true, 
      message: 'Email successfully verified' 
    }
  } catch (error) {
    console.error('\n=== Error in Email Verification Process ===')
    console.error('Error details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown error type',
      stack: error instanceof Error ? error.stack : undefined
    })
    return { 
      success: false, 
      message: 'Failed to verify email. Please try again.' 
    }
  }
} 