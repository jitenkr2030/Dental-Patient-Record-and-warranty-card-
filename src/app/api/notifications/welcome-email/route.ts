import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientEmail, patientName, patientId } = body

    const success = await EmailService.sendWelcomeEmail(
      patientEmail,
      patientName,
      patientId
    )

    return NextResponse.json({ 
      message: 'Welcome email sent',
      success 
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}