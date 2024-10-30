'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '£0',
    description: 'Perfect for getting started',
    features: [
      'Up to 5 properties',
      'Basic activity tracking',
      'Document storage',
      'Email support'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: '£100',
    period: '/month',
    description: 'Best for growing agencies',
    features: [
      'Unlimited properties',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'Team collaboration',
      'API access'
    ],
    cta: 'Start Pro Trial'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'Advanced security',
      'Bulk operations',
      'Training sessions'
    ],
    cta: 'Contact Sales'
  }
]

type PricingPlansProps = {
  onEnterpriseClick: () => void
}

export function PricingPlans({ onEnterpriseClick }: PricingPlansProps) {
  const { isDarkTheme } = useTheme()

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
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
            onClick={plan.name === 'Enterprise' ? onEnterpriseClick : undefined}
            className={cn(
              'w-full',
              isDarkTheme
                ? 'bg-white text-[#024e52] hover:bg-gray-100'
                : 'bg-[#024e52] text-white hover:bg-[#013639]'
            )}
          >
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>
  )
}