'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

type PaymentFormProps = {
  clientSecret: string
  planName: string
  amount: string
}

export function PaymentForm({ planName, amount }: PaymentFormProps) {
  const { isDarkTheme } = useTheme()
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      })

      if (error) {
        setErrorMessage(error.message ?? 'An error occurred')
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred')
      console.error('Payment error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Subscribe to {planName}</h2>
        <p className="text-3xl font-bold">{amount}</p>
      </div>

      <div className={cn(
        'p-4 rounded-lg mb-6',
        isDarkTheme ? 'bg-[#013639]' : 'bg-white'
      )}>
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className={cn(
          'w-full',
          isDarkTheme
            ? 'bg-white text-[#024e52] hover:bg-gray-100'
            : 'bg-[#024e52] text-white hover:bg-[#013639]'
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay now'
        )}
      </Button>
    </form>
  )
} 