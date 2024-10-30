'use client'

import { forwardRef } from 'react'
import { ContactForm } from '@/components/contact/ContactForm'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export const ContactFooter = forwardRef<HTMLDivElement>((_, ref) => {
  const { isDarkTheme } = useTheme()

  return (
    <footer className={cn(
      'py-16',
      isDarkTheme ? 'bg-[#013639]' : 'bg-white'
    )}>
      <div ref={ref} className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-xl opacity-80">Let&apos;s discuss how we can help your business grow</p>
        </div>
        <ContactForm />
      </div>
    </footer>
  )
})

ContactFooter.displayName = 'ContactFooter'