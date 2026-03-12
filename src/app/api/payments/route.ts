import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payments'
import { z } from 'zod'

const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('inr'),
  metadata: z.record(z.string()).optional()
})

const createCheckoutSessionSchema = z.object({
  priceId: z.string(),
  customerEmail: z.string().email().optional(),
  metadata: z.record(z.string()).optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional()
})

// POST /api/payments/create-payment-intent - Create payment intent
export async function createPaymentIntent(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createPaymentIntentSchema.parse(body)

    const paymentIntent = await PaymentService.createPaymentIntent(
      validatedData.amount,
      validatedData.currency,
      validatedData.metadata
    )

    return NextResponse.json({
      success: true,
      paymentIntent
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Failed to create payment intent' 
    }, { status: 500 })
  }
}

// POST /api/payments/create-checkout-session - Create checkout session
export async function createCheckoutSession(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createCheckoutSessionSchema.parse(body)

    const checkoutSession = await PaymentService.createCheckoutSession(
      validatedData.priceId,
      validatedData.customerEmail,
      validatedData.metadata,
      validatedData.successUrl,
      validatedData.cancelUrl
    )

    return NextResponse.json({
      success: true,
      checkoutSession
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Failed to create checkout session' 
    }, { status: 500 })
  }
}

// POST /api/payments/create-payment-checkout - Create payment checkout session
export async function createPaymentCheckout(request: NextRequest) {
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

// GET /api/payments/payment-intent/[id] - Retrieve payment intent
export async function retrievePaymentIntent(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const paymentIntent = await PaymentService.retrievePaymentIntent(id)

    return NextResponse.json({
      success: true,
      paymentIntent
    })
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    return NextResponse.json({ 
      error: 'Failed to retrieve payment intent' 
    }, { status: 500 })
  }
}

// POST /api/payments/webhook - Handle Stripe webhooks
export async function handleWebhook(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json({ 
        error: 'Missing stripe-signature header' 
      }, { status: 400 })
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
    
    const result = await PaymentService.handleWebhook(
      body,
      signature,
      endpointSecret
    )

    return NextResponse.json({ received: true, result })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json({ 
      error: 'Webhook handling failed' 
    }, { status: 500 })
  }
}