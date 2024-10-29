import { subscribeEmail } from '@/app/actions/email'
import { sendEmail } from '@/lib/email-service'

// Mock the email service
jest.mock('@/lib/email-service', () => ({
  sendEmail: jest.fn()
}))

// Mock database connection and models
jest.mock('@/db/dbConnect', () => jest.fn())
jest.mock('@/models/AgentEmail', () => ({
  findOne: jest.fn()
}))
jest.mock('@/models/PendingEmailVerification', () => ({
  findOne: jest.fn(),
  prototype: {
    save: jest.fn()
  }
}))

describe('Email Subscription', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should reject invalid email formats', async () => {
    const testCases = [
      { email: '', expectedMessage: 'Email is required' },
      { email: 'notanemail', expectedMessage: 'Invalid email format' },
      { email: 'test@', expectedMessage: 'Invalid email format' },
      { email: '@test.com', expectedMessage: 'Invalid email format' },
      { email: 'test@test', expectedMessage: 'Email must contain a domain' }
    ]

    for (const { email, expectedMessage } of testCases) {
      const result = await subscribeEmail(email)
      expect(result).toEqual({
        success: false,
        message: expectedMessage
      })
    }
  })

  it('should accept valid email formats', async () => {
    // Mock successful email sending
    ;(sendEmail as jest.Mock).mockResolvedValue(true)

    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.com'
    ]

    for (const email of validEmails) {
      const result = await subscribeEmail(email)
      expect(result.success).toBe(true)
    }
  })
}) 