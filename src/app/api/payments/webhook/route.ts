import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payments'

export async function POST(request: NextRequest) {
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