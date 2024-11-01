'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async (priceId: string) => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const { clientSecret, amount } = await response.json()

      if (clientSecret) {
        router.push(`/payment/checkout?clientSecret=${clientSecret}&amount=${amount}`)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleCheckout,
    isLoading,
  }
} 