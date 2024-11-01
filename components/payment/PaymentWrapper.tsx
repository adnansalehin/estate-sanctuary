'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentForm } from './PaymentForm'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type PaymentWrapperProps = {
  clientSecret: string
  planName: string
  amount: string
}

export function PaymentWrapper({ clientSecret, planName, amount }: PaymentWrapperProps) {
  const { isDarkTheme } = useTheme()

  const appearance = {
    theme: isDarkTheme ? 'night' : 'stripe',
    variables: {
      colorPrimary: '#024e52',
      colorBackground: isDarkTheme ? '#013639' : '#ffffff',
      colorText: isDarkTheme ? '#ffffff' : '#024e52',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    },
  } as const

  return (
    <div className={cn(
      'min-h-screen pt-24 flex items-center justify-center px-4',
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    )}>
      <Elements 
        stripe={stripePromise} 
        options={{
          clientSecret,
          appearance,
        }}
      >
        <PaymentForm 
          clientSecret={clientSecret}
          planName={planName}
          amount={amount}
        />
      </Elements>
    </div>
  )
} 