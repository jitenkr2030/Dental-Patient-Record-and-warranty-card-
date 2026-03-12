import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientEmail, patientName, treatmentType, dentistName, completionDate } = body

    const success = await EmailService.sendTreatmentCompletion(
      patientEmail,
      patientName,
      treatmentType,
      dentistName,
      new Date(completionDate)
    )

    return NextResponse.json({ 
      message: 'Treatment completion email sent',
      success 
    })
  } catch (error) {
    console.error('Error sending treatment completion email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}