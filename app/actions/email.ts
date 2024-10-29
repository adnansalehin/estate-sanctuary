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
  console.log(`\n📝 Processing subscription for: ${email}`)
  
  try {
    // Validate email
    const validationResult = emailSchema.safeParse({ email })
    
    if (!validationResult.success) {
      console.log('✗ Email validation failed:', validationResult.error.errors[0].message)
      return { 
        success: false, 
        message: validationResult.error.errors[0].message 
      }
    }
    
    const validatedEmail = validationResult.data.email
    console.log('✓ Email validated:', validatedEmail)
    
    // Connect to database and check existing registrations
    await dbConnect()
    const [existingVerified, existingPending] = await Promise.all([
      AgentEmail.findOne({ email: validatedEmail }),
      PendingEmailVerification.findOne({ email: validatedEmail })
    ])

    if (existingVerified) {
      console.log('! Email already verified:', validatedEmail)
      return { 
        success: false, 
        message: 'This email is already registered and verified' 
      }
    }

    if (existingPending) {
      const minutesRemaining = Math.ceil(
        (24 * 60 * 60 * 1000 - (Date.now() - existingPending.createdAt.getTime())) / (60 * 1000)
      )
      console.log('! Pending verification exists:', validatedEmail)
      return { 
        success: false, 
        message: `This email already has a pending verification. Please check your inbox or try again in ${minutesRemaining} minutes.` 
      }
    }
    
    // Create verification token and send email
    const pendingVerification = await new PendingEmailVerification({ email: validatedEmail }).save()
    console.log('✓ Verification token created')
    
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${pendingVerification.verificationToken}`
    const emailSent = await sendEmail(
      validatedEmail,
      'Verify your email address',
      generateWelcomeEmail(verificationUrl)
    )
    
    if (!emailSent) {
      console.log('✗ Failed to send verification email')
      await PendingEmailVerification.deleteOne({ _id: pendingVerification._id })
      throw new Error('Failed to send verification email')
    }
    
    console.log('✓ Verification email sent successfully')
    return { 
      success: true, 
      message: 'Please check your email to verify your subscription' 
    }
  } catch (error) {
    console.error('✗ Subscription error:', error instanceof Error ? error.message : 'Unknown error')
    return { 
      success: false, 
      message: 'Failed to process subscription. Please try again.' 
    }
  }
}

export async function verifyEmail(token: string) {
  console.log(`\n🔑 Processing verification for token: ${token.substring(0, 8)}...`)
  
  try {
    await dbConnect()
    const pendingVerification = await PendingEmailVerification.findOne({ verificationToken: token })
    
    if (!pendingVerification) {
      console.log('✗ No pending verification found')
      return { 
        success: false, 
        message: 'Invalid or expired verification link' 
      }
    }
    
    // Create verified email entry
    await new AgentEmail({
      email: pendingVerification.email,
      signupDate: new Date(),
      status: 'active'
    }).save()
    
    console.log('✓ Email verified:', pendingVerification.email)
    
    // Delete pending verification
    await PendingEmailVerification.deleteOne({ _id: pendingVerification._id })
    console.log('✓ Pending verification cleaned up')
    
    return { 
      success: true, 
      message: 'Email successfully verified' 
    }
  } catch (error) {
    console.error('✗ Verification error:', error instanceof Error ? error.message : 'Unknown error')
    return { 
      success: false, 
      message: 'Failed to verify email. Please try again.' 
    }
  }
} 