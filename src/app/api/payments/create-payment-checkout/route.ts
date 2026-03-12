import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payments'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, metadata, successUrl, cancelUrl } = body

    const checkoutSession = await PaymentService.createPaymentCheckoutSession(
      amount,
      currency,
      metadata,
      successUrl,
      cancelUrl
    )

    return NextResponse.json({
      success: true,
      checkoutSession
    })
  } catch (error) {
    console.error('Error creating payment checkout session:', error)
    return NextResponse.json({ 
      error: 'Failed to create payment checkout session' 
    }, { status: 500 })
  }
}