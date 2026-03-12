import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientEmail, patientName, dentistName, appointmentDate, appointmentTime } = body

    const success = await EmailService.sendAppointmentConfirmation(
      patientEmail,
      patientName,
      dentistName,
      new Date(appointmentDate),
      appointmentTime
    )

    return NextResponse.json({ 
      message: 'Appointment confirmation email sent',
      success 
    })
  } catch (error) {
    console.error('Error sending appointment confirmation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}