'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const contactSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine(email => email.includes('.'), 'Email must contain a domain'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const { isDarkTheme } = useTheme()
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      contactSchema.parse(formData)
      setErrors({})
      
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData)
      toast.success('Message sent successfully!')
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactFormData> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message
          }
        })
        setErrors(fieldErrors)
        
        // Show first error in toast
        if (error.errors[0]) {
          toast.error(error.errors[0].message)
        }
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form
      className="max-w-2xl mx-auto"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={cn(
                isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-100',
                errors.firstName && 'border-red-500'
              )}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={cn(
                isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-100',
                errors.lastName && 'border-red-500'
              )}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-100',
              errors.email && 'border-red-500'
            )}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={cn(
              isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-100',
              errors.message && 'border-red-500'
            )}
            placeholder="Tell us about your needs"
            rows={3}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className={cn(
            'w-full',
            isDarkTheme
              ? 'bg-white text-[#024e52] hover:bg-gray-100'
              : 'bg-[#024e52] text-white hover:bg-[#013639]'
          )}
        >
          Send Message
        </Button>
      </div>
    </form>
  )
}