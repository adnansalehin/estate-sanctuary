import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { STRIPE_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const { priceId, successUrl, cancelUrl } = await request.json()

    // Validate the price ID
    if (!Object.values(STRIPE_PRICE_IDS).includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      automatic_tax: { enabled: true },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
} 