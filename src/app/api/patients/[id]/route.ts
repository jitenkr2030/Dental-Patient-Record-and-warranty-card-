import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import { z } from 'zod'

// GET /api/patients/[id] - Get a specific patient
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const patient = await db.patient.findFirst({
      where: {
        id,
        clinicId: session.user.clinicId
      },
      include: {
        treatments: {
          orderBy: { date: 'desc' },
          include: {
            dentist: {
              select: { name: true }
            }
          }
        },
        warranties: {
          orderBy: { createdAt: 'desc' },
          include: {
            treatment: {
              select: { treatmentType: true, tooth: true }
            }
          }
        },
        appointments: {
          orderBy: { date: 'desc' },
          include: {
            dentist: {
              select: { name: true }
            }
          }
        },
        xrays: {
          orderBy: { date: 'desc' },
          select: {
            id: true,
            type: true,
            date: true,
            description: true,
            fileSize: true
          }
        },
        clinic: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    })

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    return NextResponse.json({ patient })
  } catch (error) {
    console.error('Error fetching patient:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/patients/[id] - Update a patient
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const patientId = body.patientId

    // Verify patient belongs to the clinic
    const existingPatient = await db.patient.findFirst({
      where: {
        id,
        clinicId: session.user.clinicId
      }
    })

    if (!existingPatient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    // Check if patientId is unique (if being changed)
    if (patientId && patientId !== existingPatient.patientId) {
      const existingPatientId = await db.patient.findFirst({
        where: { patientId }
      })
      
      if (existingPatientId) {
        return NextResponse.json({ 
          error: 'Patient ID already exists' 
        }, { status: 409 })
      }
    }

    const updateData = {
      ...body,
      ...(body.dateOfBirth && { dateOfBirth: new Date(body.dateOfBirth) }),
      ...(patientId && { patientId })
    }

    const patient = await db.patient.update({
      where: { id },
      data: updateData,
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
      message: 'Patient updated successfully',
      patient 
    })
  } catch (error) {
    console.error('Error updating patient:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/patients/[id] - Delete a patient
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify patient belongs to the clinic
    const existingPatient = await db.patient.findFirst({
      where: {
        id,
        clinicId: session.user.clinicId
      }
    })

    if (!existingPatient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    // Delete patient (this will cascade delete related records due to foreign key constraints)
    await db.patient.delete({
      where: { id }
    })

    return NextResponse.json({ 
      message: 'Patient deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting patient:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}