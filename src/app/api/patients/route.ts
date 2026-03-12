import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import { z } from 'zod'

// Validation schema for creating patients
const createPatientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  dateOfBirth: z.string(),
  bloodGroup: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  emergencyContact: z.string().min(10, "Emergency contact must be at least 10 characters"),
})

// GET /api/patients - Get all patients for the authenticated clinic
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const where = {
      clinicId: session.user.clinicId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { patientId: { contains: search, mode: 'insensitive' } },
        ]
      })
    }

    const [patients, total] = await Promise.all([
      db.patient.findMany({
        where,
        include: {
          treatments: {
            select: {
              id: true,
              treatmentType: true,
              date: true,
              cost: true,
              status: true
            },
            orderBy: { date: 'desc' },
            take: 5
          },
          warranties: {
            select: {
              id: true,
              warrantyPeriod: true,
              endDate: true,
              status: true
            }
          },
          appointments: {
            select: {
              id: true,
              date: true,
              time: true,
              status: true,
              purpose: true
            },
            orderBy: { date: 'desc' },
            take: 5
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.patient.count({ where })
    ])

    return NextResponse.json({
      patients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/patients - Create a new patient
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createPatientSchema.parse(body)

    // Generate unique patient ID
    const patientId = `DP${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

    // Create patient with unique ID
    const patient = await db.patient.create({
      data: {
        ...validatedData,
        patientId,
        clinicId: session.user.clinicId,
        dateOfBirth: new Date(validatedData.dateOfBirth),
      },
      include: {
        clinic: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    })

    return NextResponse.json({ 
      message: 'Patient created successfully',
      patient 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating patient:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: error.errors 
      }, { status: 400 })
    }

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ 
        error: 'Patient with this email or phone already exists' 
      }, { status: 409 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}