import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import { z } from 'zod'

// Validation schema for creating appointments
const createAppointmentSchema = z.object({
  patientId: z.string(),
  dentistId: z.string().optional(),
  dateTime: z.string(),
  duration: z.number().positive(),
  purpose: z.string(),
  notes: z.string().optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled']).default('scheduled'),
})

// GET /api/appointments - Get all appointments for the authenticated clinic
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const patientId = searchParams.get('patientId')
    const dentistId = searchParams.get('dentistId')
    const status = searchParams.get('status')
    const date = searchParams.get('date')

    const where = {
      clinicId: session.user.clinicId,
      ...(patientId && { patientId }),
      ...(dentistId && { dentistId }),
      ...(status && { status }),
      ...(date && {
        dateTime: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
        }
      })
    }

    const [appointments, total] = await Promise.all([
      db.appointment.findMany({
        where,
        include: {
          patient: {
            select: {
              id: true,
              name: true,
              patientId: true,
              phone: true
            }
          },
          dentist: {
            select: {
              id: true,
              name: true,
              specialization: true
            }
          }
        },
        orderBy: { dateTime: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.appointment.count({ where })
    ])

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/appointments - Create a new appointment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createAppointmentSchema.parse(body)

    // Verify patient belongs to the clinic
    const patient = await db.patient.findFirst({
      where: {
        id: validatedData.patientId,
        clinicId: session.user.clinicId
      }
    })

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    // Verify dentist belongs to the clinic (if specified)
    if (validatedData.dentistId) {
      const dentist = await db.dentist.findFirst({
        where: {
          id: validatedData.dentistId,
          clinicId: session.user.clinicId
        }
      })

      if (!dentist) {
        return NextResponse.json({ error: 'Dentist not found' }, { status: 404 })
      }
    }

    // Check for time conflicts
    const appointmentDateTime = new Date(validatedData.dateTime)
    const endTime = new Date(appointmentDateTime.getTime() + validatedData.duration * 60000)

    const conflictingAppointment = await db.appointment.findFirst({
      where: {
        clinicId: session.user.clinicId,
        dentistId: validatedData.dentistId,
        dateTime: {
          lt: endTime,
          gte: appointmentDateTime
        },
        status: {
          notIn: ['cancelled', 'completed']
        }
      }
    })

    if (conflictingAppointment) {
      return NextResponse.json({ 
        error: 'Time slot already booked',
        conflictingAppointment: {
          dateTime: conflictingAppointment.dateTime,
          duration: conflictingAppointment.duration,
          patient: conflictingAppointment.patient
        }
      }, { status: 409 })
    }

    // Create appointment
    const appointment = await db.appointment.create({
      data: {
        ...validatedData,
        clinicId: session.user.clinicId,
        dateTime: appointmentDateTime,
        duration: validatedData.duration
      },
      include: {
        patient: {
          select: {
            name: true,
            patientId: true,
            phone: true
          }
        },
        dentist: validatedData.dentistId ? {
          select: {
            name: true,
            specialization: true
          }
        } : undefined
      }
    })

    // Send notification (in real implementation, you'd use email/SMS service)
    console.log(`Appointment created for ${patient.name} on ${appointment.dateTime}`)

    return NextResponse.json({ 
      message: 'Appointment created successfully',
      appointment 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}