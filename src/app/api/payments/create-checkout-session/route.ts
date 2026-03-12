import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payments'
import { z } from 'zod'

const createCheckoutSessionSchema = z.object({
  priceId: z.string(),
  customerEmail: z.string().email().optional(),
  metadata: z.record(z.string()).optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional()
})

export async function POST(request: NextRequest) {
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