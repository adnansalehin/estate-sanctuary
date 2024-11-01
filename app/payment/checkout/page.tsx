import { Metadata } from 'next'
import { CheckoutContent } from '@/components/payment/CheckoutContent'

export const metadata: Metadata = {
  title: 'Checkout - Estate Sanctuary',
  description: 'Complete your subscription purchase',
}

export default function CheckoutPage() {
  return <CheckoutContent />
} 