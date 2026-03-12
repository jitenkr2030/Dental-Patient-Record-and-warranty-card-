import { NextRequest, NextResponse } from 'next/server'
import { QRCodeGenerator } from '@/lib/qrcode'
import { z } from 'zod'

const generateQRSchema = z.object({
  patientId: z.string(),
  type: z.enum(['patient-passport', 'warranty-certificate', 'appointment']),
  appointmentId: z.string().optional(),
  warrantyId: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = generateQRSchema.parse(body)

    let qrCodeDataURL: string

    switch (validatedData.type) {
      case 'patient-passport':
        qrCodeDataURL = await QRCodeGenerator.generatePatientQR(
          validatedData.patientId,
          { width: validatedData.width, height: validatedData.height }
        )
        break
      
      case 'warranty-certificate':
        if (!validatedData.warrantyId) {
          return NextResponse.json({ 
            error: 'warrantyId is required for warranty certificates' 
          }, { status: 400 })
        }
        qrCodeDataURL = await QRCodeGenerator.generateWarrantyQR(
          validatedData.warrantyId,
          { width: validatedData.width, height: validatedData.height }
        )
        break
      
      case 'appointment':
        if (!validatedData.appointmentId) {
          return NextResponse.json({ 
            error: 'appointmentId is required for appointments' 
          }, { status: 400 })
        }
        qrCodeDataURL = await QRCodeGenerator.generateAppointmentQR(
          validatedData.appointmentId,
          { width: validatedData.width, height: validatedData.height }
        )
        break
      
      default:
        return NextResponse.json({ error: 'Invalid QR code type' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataURL,
      type: validatedData.type
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}