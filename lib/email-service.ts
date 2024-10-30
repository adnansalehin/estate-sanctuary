import nodemailer from 'nodemailer'
import { TransportOptions } from 'nodemailer'

// Create reusable transporter with iCloud custom domain settings
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER_AUTH,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  }
} as TransportOptions)

export async function sendEmail(to: string, subject: string, html: string) {
  console.log(`📧 Sending email to: ${to}`)

  try {
    // Verify SMTP connection
    await transporter.verify()
    console.log('✓ SMTP connection verified')

    // Send email with additional headers to prevent URL modification
    const info = await transporter.sendMail({
      from: {
        name: 'Estate Sanctuary',
        address: process.env.EMAIL_USER
      },
      to,
      subject,
      html,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'Content-Type': 'text/html; charset=UTF-8',
        'X-Content-Type-Options': 'nosniff'
      },
      textEncoding: 'base64',
      encoding: 'quoted-printable'
    })
    
    console.log(`✓ Email sent successfully (ID: ${info.messageId})`)
    return true
  } catch (error) {
    console.error('✗ Failed to send email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      recipient: to
    })
    return false
  }
} 