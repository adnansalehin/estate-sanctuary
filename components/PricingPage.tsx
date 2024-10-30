'use client'

import { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { PricingPlans } from '@/components/pricing/PricingPlans'
import { ContactFooter } from '@/components/ContactFooter'
import { cn } from '@/lib/utils'

export function PricingPage() {
  const { isDarkTheme } = useTheme()
  const contactFormRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })
    const formElement = contactFormRef.current?.querySelector('form')
    if (formElement) {
      formElement.classList.remove('highlight-form-reset')
      formElement.classList.add('highlight-form')
      
      // Add reset class after animation completes
      formElement.addEventListener('animationend', () => {
        formElement.classList.remove('highlight-form')
        formElement.classList.add('highlight-form-reset')
      }, { once: true })
    }
  }

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300',
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    )}>
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl opacity-80">Choose the perfect plan for your needs</p>
          </div>
          <PricingPlans onEnterpriseClick={scrollToContact} />
        </div>
      </main>

      <style jsx global>{`
        @keyframes highlightBorder {
          0% {
            border-color: ${isDarkTheme ? '#024e52' : '#e6f7f7'};
            box-shadow: 0 0 0 0 ${isDarkTheme ? '#024e5280' : '#e6f7f780'};
            transform: scale(1);
          }
          15% {
            border-color: ${isDarkTheme ? '#04d9ff' : '#024e52'};
            box-shadow: 0 0 20px 0 ${isDarkTheme ? '#04d9ff80' : '#024e5280'};
            transform: scale(1.01);
          }
          85% {
            border-color: ${isDarkTheme ? '#04d9ff' : '#024e52'};
            box-shadow: 0 0 20px 0 ${isDarkTheme ? '#04d9ff80' : '#024e5280'};
            transform: scale(1.01);
          }
          100% {
            border-color: ${isDarkTheme ? '#024e52' : '#e6f7f7'};
            box-shadow: 0 0 0 0 ${isDarkTheme ? '#024e5280' : '#e6f7f780'};
            transform: scale(1);
          }
        }

        .highlight-form {
          animation: highlightBorder 2s cubic-bezier(0.4, 0, 0.2, 1);
          border-width: 2px;
          border-style: solid;
          border-radius: 0.5rem;
          padding: 2rem;
        }

        .highlight-form-reset {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border-width: 2px;
          border-style: solid;
          border-color: ${isDarkTheme ? '#024e52' : '#e6f7f7'};
          border-radius: 0.5rem;
          padding: 2rem;
          transform: scale(1);
          box-shadow: 0 0 0 0 ${isDarkTheme ? '#024e5280' : '#e6f7f780'};
        }
      `}</style>

      <ContactFooter ref={contactFormRef} />
    </div>
  )
}