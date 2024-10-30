'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { subscribeEmail } from '@/app/actions/email'
import { toast } from 'sonner'
import content from '@/content/landing-page.json'
import { ContactFooter } from '@/components/ContactFooter'

export function LandingPage() {
  const { isDarkTheme } = useTheme()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactFormRef = useRef<HTMLDivElement>(null)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await subscribeEmail(email)
      
      if (result.success) {
        toast.success(result.message)
        setEmail('')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
      console.error('Subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })
    const formElement = contactFormRef.current?.querySelector('form')
    if (formElement) {
      formElement.classList.remove('highlight-form-reset')
      formElement.classList.add('highlight-form')
      
      formElement.addEventListener('animationend', () => {
        formElement.classList.remove('highlight-form')
        formElement.classList.add('highlight-form-reset')
      }, { once: true })
    }
  }

  return (
    <div className={cn(
      'min-h-screen pt-24 transition-colors duration-300',
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    )}>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {content.hero.title}
          </h1>
          <p className="mt-6 text-lg leading-8 opacity-80">
            {content.hero.subtitle}
          </p>
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md">
                <div className="flex gap-x-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder={content.emailForm.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      'flex-1',
                      isDarkTheme ? 'bg-[#013639] text-white' : 'bg-white',
                      isSubmitting && 'opacity-50'
                    )}
                    disabled={isSubmitting}
                    required
                    aria-label="Email address"
                  />
                  <Button 
                    type="submit"
                    className={cn(
                      isDarkTheme 
                        ? 'bg-white text-[#024e52] hover:bg-gray-100' 
                        : 'bg-[#024e52] text-white hover:bg-[#013639]',
                      isSubmitting && 'opacity-50'
                    )}
                    disabled={isSubmitting}
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? content.emailForm.button.submitting : content.emailForm.button.default}
                  </Button>
                </div>
              </form>
              <span className="px-4 opacity-60">or</span>
              <Button
                onClick={scrollToContact}
                className={cn(
                  'whitespace-nowrap',
                  isDarkTheme
                    ? 'bg-white text-[#024e52] hover:bg-gray-100'
                    : 'bg-[#024e52] text-white hover:bg-[#013639]'
                )}
              >
                Contact Sales
              </Button>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((feature) => (
              <div 
                key={feature.id}
                className={cn(
                  'rounded-xl p-8',
                  isDarkTheme ? 'bg-[#013639]' : 'bg-white'
                )}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-opacity-10">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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