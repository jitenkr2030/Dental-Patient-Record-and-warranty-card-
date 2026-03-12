import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import { z } from 'zod'

// Validation schema for creating treatments
const createTreatmentSchema = z.object({
  patientId: z.string(),
  dentistId: z.string(),
  toothNumber: z.string().optional(),
  treatmentType: z.string(),
  description: z.string(),
  cost: z.number().positive(),
  notes: z.string().optional(),
  warrantyPeriod: z.number().positive().optional(),
  date: z.string(),
})

// GET /api/treatments - Get all treatments for the authenticated clinic
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

    const where = {
      clinicId: session.user.clinicId,
      ...(patientId && { patientId }),
      ...(dentistId && { dentistId }),
      ...(status && { status })
    }

    const [treatments, total] = await Promise.all([
      db.treatment.findMany({
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
          },
          warranty: {
            select: {
              id: true,
              warrantyPeriod: true,
              endDate: true,
              status: true
            }
          }
        },
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.treatment.count({ where })
    ])

    return NextResponse.json({
      treatments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching treatments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/treatments - Create a new treatment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createTreatmentSchema.parse(body)

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

    // Verify dentist belongs to the clinic
    const dentist = await db.dentist.findFirst({
      where: {
        id: validatedData.dentistId,
        clinicId: session.user.clinicId
      }
    })

    if (!dentist) {
      return NextResponse.json({ error: 'Dentist not found' }, { status: 404 })
    }

    // Create treatment
    const treatment = await db.treatment.create({
      data: {
        ...validatedData,
        clinicId: session.user.clinicId,
        date: new Date(validatedData.date),
        cost: validatedData.cost * 100, // Convert to paise
      },
      include: {
        patient: {
          select: {
            name: true,
            patientId: true,
            phone: true
          }
        },
        dentist: {
          select: {
            name: true,
            specialization: true
          }
        }
      }
    })

    // Create warranty if warranty period is specified
    if (validatedData.warrantyPeriod) {
      const startDate = new Date(validatedData.date)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + validatedData.warrantyPeriod)

      await db.warranty.create({
        data: {
          treatmentId: treatment.id,
          patientId: validatedData.patientId,
          warrantyPeriod: validatedData.warrantyPeriod,
          startDate,
          endDate,
          terms: `Warranty for ${validatedData.treatmentType} treatment`,
          clinicId: session.user.clinicId
        }
      })
    }

    return NextResponse.json({ 
      message: 'Treatment created successfully',
      treatment 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating treatment:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}