import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'
import { z } from 'zod'

const sendEmailSchema = z.object({
  to: z.union([z.string(), z.array(z.string())]),
  subject: z.string(),
  html: z.string(),
  text: z.string().optional()
})

// POST /api/notifications/send - Send custom email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = sendEmailSchema.parse(body)

    const success = await EmailService.sendEmail({
      to: validatedData.to,
      subject: validatedData.subject,
      html: validatedData.html,
      text: validatedData.text
    })

    if (success) {
      return NextResponse.json({ 
        message: 'Email sent successfully',
        success: true 
      })
    } else {
      return NextResponse.json({ 
        error: 'Failed to send email',
        success: false 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending email:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/notifications/appointment-confirmation - Send appointment confirmation
export async function sendAppointmentConfirmation(request: NextRequest) {
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

// POST /api/notifications/treatment-completion - Send treatment completion email
export async function sendTreatmentCompletion(request: NextRequest) {
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

// POST /api/notifications/welcome-email - Send welcome email
export async function sendWelcomeEmail(request: NextRequest) {
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