import { PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const sampleClinics = [
  {
    name: "Smile Dental Care",
    email: "demo@smiledental.com",
    phone: "+91 22 2345 6789",
    address: "123, MG Road, Mumbai, Maharashtra 400001",
    licenseNo: "DL2024001",
    subscription: "premium"
  },
  {
    name: "Pearl Dental Clinic",
    email: "pearl@pearldental.com",
    phone: "+91 11 9876 5432",
    address: "456, CP Road, Delhi, 110001",
    licenseNo: "DL2024002",
    subscription: "basic"
  }
]

const sampleDentists = [
  {
    name: "Dr. Priya Patel",
    email: "priya.patel@smiledental.com",
    phone: "+91 98765 43210",
    licenseNo: "MCD-2020-123"
  },
  {
    name: "Dr. Amit Kumar",
    email: "amit.kumar@smiledental.com",
    phone: "+91 98765 43211",
    licenseNo: "MCD-2018-456"
  }
]

const samplePatients = [
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    bloodGroup: "O+",
    allergies: "Penicillin",
    medications: "None",
    emergencyContact: "+91 98765 43211"
  },
  {
    name: "Priya Nair",
    email: "priya.nair@email.com",
    phone: "+91 98765 43211",
    dateOfBirth: "1985-08-22",
    bloodGroup: "A+",
    allergies: "None",
    medications: "Vitamin D supplements",
    emergencyContact: "+91 98765 43212"
  },
  {
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 98765 43212",
    dateOfBirth: "1992-12-10",
    bloodGroup: "B+",
    allergies: "Latex",
    medications: "Blood pressure medication",
    emergencyContact: "+91 98765 43213"
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clean existing data
    console.log('🧹 Cleaning existing data...')
    await prisma.appointment.deleteMany()
    await prisma.warranty.deleteMany()
    await prisma.treatment.deleteMany()
    await prisma.xRay.deleteMany()
    await prisma.patient.deleteMany()
    await prisma.dentist.deleteMany()
    await prisma.clinic.deleteMany()

    // Create clinics
    console.log('🏥 Creating clinics...')
    const clinics = []
    for (const clinicData of sampleClinics) {
      const clinic = await prisma.clinic.create({
        data: clinicData
      })
      clinics.push(clinic)
    }

    // Create dentists
    console.log('👨‍⚕️ Creating dentists...')
    const dentists = []
    for (const dentistData of sampleDentists) {
      const dentist = await prisma.dentist.create({
        data: {
          ...dentistData,
          clinicId: clinics[0].id // Assign all dentists to first clinic for demo
        }
      })
      dentists.push(dentist)
    }

    // Create patients
    console.log('👥 Creating patients...')
    const patients = []
    for (const patientData of samplePatients) {
      const patient = await prisma.patient.create({
        data: {
          ...patientData,
          clinicId: clinics[0].id, // Assign all patients to first clinic for demo
          patientId: `DP${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          dateOfBirth: new Date(patientData.dateOfBirth)
        }
      })
      patients.push(patient)
    }

    // Create treatments
    console.log('🦷 Creating treatments...')
    const treatments = []
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i]
      const treatmentTypes = ['Root Canal', 'Crown', 'Filling', 'Cleaning', 'Extraction']
      const teeth = ['Tooth 16', 'Tooth 26', 'Tooth 11', 'Tooth 21', 'Tooth 36']
      
      for (let j = 0; j < 3; j++) {
        const treatment = await prisma.treatment.create({
          data: {
            patientId: patient.id,
            dentistId: dentists[j % dentists.length].id,
            clinicId: clinics[0].id,
            treatmentType: treatmentTypes[j % treatmentTypes.length],
            toothNumber: teeth[j % teeth.length],
            date: new Date(2024, 1, 15 + i * 10),
            cost: new Decimal(5000 + (j * 2000)),
            description: `${treatmentTypes[j % treatmentTypes.length]} treatment on ${teeth[j % teeth.length]}`
          }
        })
        treatments.push(treatment)

        // Create warranty for treatments with warranty period
        if (j % 2 === 1) { // Every other treatment gets a warranty
          const startDate = new Date(2024, 1, 15 + i * 10)
          const endDate = new Date(startDate)
          endDate.setMonth(endDate.getMonth() + (j + 1))

          await prisma.warranty.create({
            data: {
              treatmentId: treatment.id,
              patientId: patient.id,
              warrantyPeriod: j + 1,
              startDate,
              endDate,
              terms: `Warranty for ${treatment.treatmentType} treatment on ${treatment.toothNumber}`
            }
          })
        }
      }
    }

    // Create appointments
    console.log('📅 Creating appointments...')
    const appointmentTypes = ['Regular Checkup', 'Root Canal', 'Crown', 'Cleaning', 'Consultation']
    const appointmentStatuses = ['scheduled', 'confirmed', 'completed']
    
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i]
      
      for (let j = 0; j < 2; j++) {
        const appointment = await prisma.appointment.create({
          data: {
            patientId: patient.id,
            dentistId: dentists[j % dentists.length].id,
            clinicId: clinics[0].id,
            dateTime: new Date(2024, 2, 15 + i * 5, 10 + j * 2),
            duration: 30 + (j * 15),
            status: appointmentStatuses[j % appointmentStatuses.length],
            notes: `Appointment for ${appointmentTypes[j % appointmentTypes.length]}`
          }
        })
      }
    }

    // Create sample X-rays
    console.log('📸 Creating X-rays...')
    const xrayTypes = ['Periapical', 'Bite-wing', 'Panoramic', 'Cephalometric']
    
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i]
      
      for (let j = 0; j < 2; j++) {
        await prisma.xRay.create({
          data: {
            patientId: patient.id,
            type: xrayTypes[j % xrayTypes.length],
            description: `${xrayTypes[j % xrayTypes.length]} X-ray for ${patient.name}`,
            imageUrl: `/uploads/xrays/sample-${i}-${j}.jpg`,
            date: new Date(2024, 1, 20 + i * 5)
          }
        })
      }
    }

    console.log('✅ Database seeding completed successfully!')
    console.log('')
    console.log('📊 Sample Data Created:')
    console.log(`   🏥 Clinics: ${clinics.length}`)
    console.log(`   👨‍⚕️ Dentists: ${dentists.length}`)
    console.log(`   👥 Patients: ${patients.length}`)
    console.log(`   🦷 Treatments: ${treatments.length}`)
    console.log(`   📅 Appointments: ${treatments.length * 2}`)
    console.log(`   📸 X-rays: ${patients.length * 2}`)
    console.log('')
    console.log('🔑 Demo Login Credentials:')
    console.log(`   Email: demo@smiledental.com`)
    console.log(`   Password: DL2024001`)
    console.log('')
    console.log('🎯 Ready to test the application!')

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((error) => {
    console.error('❌ Fatal error during seeding:', error)
    process.exit(1)
  })