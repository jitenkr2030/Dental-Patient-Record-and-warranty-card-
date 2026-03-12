import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Configure upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'xrays')

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {
    // Directory already exists
  }
}

// GET /api/xrays - Get all X-rays for the authenticated clinic
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
    const type = searchParams.get('type')

    const where = {
      clinicId: session.user.clinicId,
      ...(patientId && { patientId }),
      ...(type && { type })
    }

    const [xrays, total] = await Promise.all([
      db.xRay.findMany({
        where,
        include: {
          patient: {
            select: {
              id: true,
              name: true,
              patientId: true
            }
          }
        },
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.xRay.count({ where })
    ])

    return NextResponse.json({
      xrays,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching X-rays:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/xrays - Upload a new X-ray
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.clinicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await ensureUploadDir()

    const formData = await request.formData()
    const file = formData.get('file') as File
    const patientId = formData.get('patientId') as string
    const type = formData.get('type') as string
    const description = formData.get('description') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!patientId) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 })
    }

    // Verify patient belongs to the clinic
    const patient = await db.patient.findFirst({
      where: {
        id: patientId,
        clinicId: session.user.clinicId
      }
    })

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/dicom']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, DICOM' 
      }, { status: 400 })
    }

    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size: 10MB' 
      }, { status: 400 })
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    const filePath = path.join(UPLOAD_DIR, uniqueFilename)

    // Save file to disk
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // Get file size
    const stats = await fs.stat(filePath)
    const fileSize = stats.size

    // Create X-ray record in database
    const xray = await db.xRay.create({
      data: {
        patientId,
        clinicId: session.user.clinicId,
        type,
        description,
        imageUrl: `/uploads/xrays/${uniqueFilename}`,
        fileSize: fileSize.toString(),
        format: fileExtension.toUpperCase(),
        date: new Date()
      }
    })

    return NextResponse.json({ 
      message: 'X-ray uploaded successfully',
      xray: {
        ...xray,
        imageUrl: `/uploads/xrays/${uniqueFilename}`
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error uploading X-ray:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}