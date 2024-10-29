import nodemailer from 'nodemailer'
import { TransportOptions } from 'nodemailer'

// Create reusable transporter with iCloud custom domain settings
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER_AUTH, // Your full custom domain email
    pass: process.env.EMAIL_APP_PASSWORD // App-specific password
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  },
  debug: true,
  logger: console,
  // Add custom headers for better deliverability
  headers: {
    'X-PM-Message-Stream': 'outbound'
  }
} as TransportOptions)

export async function sendEmail(to: string, subject: string, html: string) {
  console.log('\n=== Starting Email Send Process ===')
  console.log('Email configuration:', {
    from: process.env.EMAIL_USER,
    to,
    subject,
    smtpHost: 'smtp.mail.me.com',
    smtpPort: 587
  })

  try {
    // Test the connection first
    console.log('Testing SMTP connection...')
    const testConnection = await transporter.verify()
    console.log('SMTP connection test result:', testConnection)

    // Send email with proper "From" header formatting
    console.log('Attempting to send email...')
    const info = await transporter.sendMail({
      from: {
        name: 'Estate Sanctuary',
        address: process.env.EMAIL_USER // Your custom domain email
      },
      to,
      subject,
      html,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    })
    
    console.log('Email sent successfully!')
    console.log('Message details:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      envelope: info.envelope
    })
    console.log('=== Email Send Process Completed ===\n')
    return true
  } catch (error) {
    console.error('\n=== Error in Email Send Process ===')
    console.error('Authentication error details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown error type',
      stack: error instanceof Error ? error.stack : undefined,
      config: {
        host: 'smtp.mail.me.com',
        port: 587,
        user: process.env.EMAIL_USER,
        secure: false
      }
    })
    return false
  }
} 