import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { STRIPE_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json()

    // Validate the price ID
    if (!Object.values(STRIPE_PRICE_IDS).includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      )
    }

    // Get the price from Stripe
    const price = await stripe.prices.retrieve(priceId)
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount || 0,
      currency: price.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: formatAmount(price.unit_amount || 0, price.currency),
    })
  } catch (error) {
    console.error('Payment intent error:', error)
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    )
  }
}

function formatAmount(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  })
  return formatter.format(amount / 100)
} 