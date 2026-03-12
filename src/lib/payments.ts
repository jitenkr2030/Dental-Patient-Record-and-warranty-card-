// Mock payment service for build
export class PaymentService {
  static async createPaymentIntent(
    amount: number,
    currency: string = 'inr',
    metadata?: Record<string, string>
  ): Promise<any> {
    console.log('Mock: Payment intent created')
    return {
      id: 'pi_mock_' + Math.random().toString(36),
      amount: amount * 100,
      currency,
      status: 'requires_payment_method',
      client_secret: 'pi_mock_' + Math.random().toString(36),
      metadata
    }
  }

  static async createCheckoutSession(
    priceId: string,
    customerEmail?: string,
    metadata?: Record<string, string>,
    successUrl?: string,
    cancelUrl?: string
  ): Promise<any> {
    console.log('Mock: Checkout session created')
    return {
      id: 'cs_mock_' + Math.random().toString(36),
      url: 'https://checkout.stripe.com/mock',
      customer_email: customerEmail,
      payment_status: 'unpaid',
      metadata
    }
  }

  static async createPaymentCheckoutSession(
    amount: number,
    currency: string = 'inr',
    metadata?: Record<string, string>,
    successUrl?: string,
    cancelUrl?: string
  ): Promise<any> {
    console.log('Mock: Payment checkout session created')
    return {
      id: 'cs_mock_' + Math.random().toString(36),
      url: 'https://checkout.stripe.com/mock',
      customer_email: 'mock@example.com',
      payment_status: 'unpaid',
      metadata
    }
  }

  static async retrievePaymentIntent(paymentIntentId: string): Promise<any> {
    console.log('Mock: Payment intent retrieved')
    return {
      id: paymentIntentId,
      amount: 199900,
      currency: 'inr',
      status: 'requires_payment_method',
      client_secret: 'pi_mock_' + Math.random().toString(36),
      metadata: {}
    }
  }

  static async handleWebhook(
    body: string,
    signature: string,
    endpointSecret: string
  ): Promise<any> {
    console.log('Mock: Webhook handled')
    return { received: true }
  }
}