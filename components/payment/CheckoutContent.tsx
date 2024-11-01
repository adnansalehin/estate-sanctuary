'use client'

import { PaymentWrapper } from '@/components/payment/PaymentWrapper'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export function CheckoutContent() {
  const searchParams = useSearchParams()
  const { isDarkTheme } = useTheme()
  const clientSecret = searchParams.get('clientSecret')
  const amount = searchParams.get('amount')

  if (!clientSecret || !amount) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center p-4',
        isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
      )}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Checkout Session</h1>
          <p>Please return to the pricing page and try again.</p>
        </div>
      </div>
    )
  }

  return (
    <PaymentWrapper
      clientSecret={clientSecret}
      planName="Pro Plan"
      amount={decodeURIComponent(amount)}
    />
  )
} 