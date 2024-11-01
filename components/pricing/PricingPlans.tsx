'use client'

import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { useStripeCheckout } from '@/hooks/useStripeCheckout'
import { STRIPE_PRICE_IDS } from '@/lib/stripe'
import pricingContent from '@/content/pricing.json'

type PricingPlansProps = {
  onEnterpriseClick: () => void
}

export function PricingPlans({ onEnterpriseClick }: PricingPlansProps) {
  const { isDarkTheme } = useTheme()
  const { handleCheckout, isLoading } = useStripeCheckout()

  const handlePlanSelection = async (planName: string) => {
    if (planName === 'Enterprise') {
      onEnterpriseClick()
      return
    }

    if (planName === 'Pro') {
      await handleCheckout(STRIPE_PRICE_IDS.PRO)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {pricingContent.plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            'rounded-lg p-8',
            isDarkTheme ? 'bg-[#013639]' : 'bg-white',
            'flex flex-col'
          )}
        >
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <div className="text-3xl font-bold mb-1">
            {plan.price}
            {plan.period && <span className="text-lg font-normal">{plan.period}</span>}
          </div>
          <p className="text-sm opacity-80 mb-6">{plan.description}</p>
          <ul className="space-y-4 mb-8 flex-grow">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => handlePlanSelection(plan.name)}
            disabled={isLoading}
            className={cn(
              'w-full',
              isDarkTheme
                ? 'bg-white text-[#024e52] hover:bg-gray-100'
                : 'bg-[#024e52] text-white hover:bg-[#013639]'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              plan.cta
            )}
          </Button>
        </div>
      ))}
    </div>
  )
}