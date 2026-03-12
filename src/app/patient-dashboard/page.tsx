'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  QrCode, 
  Calendar,
  FileText,
  Shield,
  Camera,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  Heart,
  Activity,
  RefreshCw,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

interface Patient {
  id: string
  patientId: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  bloodGroup: string
  allergies: string
  medications: string
  emergencyContact: string
  clinicId: string
  createdAt: string
  updatedAt: string
}

interface Treatment {
  id: string
  treatmentType: string
  tooth: string
  dentist: string
  date: string
  cost: number
  warranty: string
  warrantyExpiry: string
  status: string
  notes: string
}

interface Appointment {
  id: string
  date: string
  time: string
  dentist: string
  purpose: string
  status: string
}

export default function PatientDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [patient, setPatient] = useState<Patient | null>(null)
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  // Fetch patient data
  const fetchPatientData = async () => {
    try {
      setLoading(true)
      if (!session?.user?.id) return

      // Fetch patient profile (assuming we have a way to get current patient)
      // For now, we'll use the first patient of the clinic
      const response = await fetch('/api/patients')
      const data = await response.json()
      
      if (data.patients && data.patients.length > 0) {
        const currentPatient = data.patients[0]
        setPatient(currentPatient)

        // Generate QR code for this patient
        const qrResponse = await fetch('/api/qrcode/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientId: currentPatient.patientId,
            type: 'patient-passport'
          })
        })
        
        if (qrResponse.ok) {
          const qrData = await qrResponse.json()
          setQrCodeUrl(qrData.qrCode)
        }

        // Fetch treatments for this patient
        const treatmentsResponse = await fetch(`/api/treatments?patientId=${currentPatient.id}`)
        const treatmentsData = await treatmentsResponse.json()
        setTreatments(treatmentsData.treatments || [])

        // Fetch appointments for this patient
        const appointmentsResponse = await fetch(`/api/appointments?patientId=${currentPatient.id}`)
        const appointmentsData = await appointmentsResponse.json()
        setAppointments(appointmentsData.appointments || [])
      }
    } catch (error) {
      console.error('Error fetching patient data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchPatientData()
    }
  }, [session])

  const refreshData = () => {
    fetchPatientData()
  }

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${patient?.patientId}-qr-code.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  const shareQRCode = async () => {
    if (!qrCodeUrl) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${patient?.name}'s Dental Passport`,
          text: `Scan this QR code to access ${patient?.name}'s dental records`,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing QR code:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Patient Not Found</CardTitle>
            <CardDescription>
              Unable to load patient information. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refreshData} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Patient Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, {patient.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={shareQRCode}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={downloadQRCode}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={refreshData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="qr-passport">QR Passport</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="warranties">Warranties</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Patient Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <span>Patient Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-slate-600">Patient ID:</span>
                      <p className="font-medium">{patient.patientId}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600">Date of Birth:</span>
                      <p className="font-medium">{patient.dateOfBirth}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600">Blood Group:</span>
                      <p className="font-medium">{patient.bloodGroup}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600">Allergies:</span>
                      <Badge variant="destructive" className="ml-2">{patient.allergies}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">Phone:</span>
                      <p className="font-medium">{patient.phone}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">Email:</span>
                      <p className="font-medium">{patient.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">Clinic:</span>
                      <p className="font-medium">Smile Dental Care</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-slate-600">Emergency:</span>
                      <p className="font-medium">{patient.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{treatments.length}</div>
                  <p className="text-sm text-slate-600">Total Treatments</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{treatments.filter(t => t.warranty !== 'N/A').length}</div>
                  <p className="text-sm text-slate-600">Active Warranties</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{appointments.filter(a => a.status === 'scheduled').length}</div>
                  <p className="text-sm text-slate-600">Upcoming</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Camera className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-sm text-slate-600">X-Rays</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Treatments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Treatments</CardTitle>
                <CardDescription>Your latest dental procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatments.slice(0, 3).map((treatment) => (
                    <div key={treatment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium">{treatment.treatmentType}</p>
                          <p className="text-sm text-slate-600">{treatment.tooth} • {treatment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{treatment.cost.toLocaleString()}</p>
                        <Badge variant="outline" className="text-xs">
                          {treatment.warranty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr-passport" className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <QrCode className="w-6 h-6 text-emerald-600" />
                  <span>Your Dental Passport QR Code</span>
                </CardTitle>
                <CardDescription>
                  Scan this code at any partner dental clinic to access your records
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* QR Code Display */}
                {qrCodeUrl ? (
                  <div className="w-64 h-64 bg-slate-100 rounded-lg mx-auto flex items-center justify-center p-4">
                    <img 
                      src={qrCodeUrl} 
                      alt="Patient QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-slate-100 rounded-lg mx-auto flex items-center justify-center p-4">
                    <QrCode className="w-16 h-16 text-slate-400" />
                    <p className="text-slate-600 mt-2">Loading QR Code...</p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={downloadQRCode}>
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Card
                  </Button>
                  <Button variant="outline" onClick={shareQRCode}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share QR Code
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-900">How to use:</p>
                      <ul className="text-sm text-blue-800 mt-1 space-y-1">
                        <li>• Save this QR code to your phone</li>
                        <li>• Show it at any partner clinic</li>
                        <li>• Instant access to your dental history</li>
                        <li>• Valid warranty verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Treatment History</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Treatment
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {treatments.map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{treatment.treatmentType}</h3>
                            <Badge variant="outline">{treatment.status}</Badge>
                            {treatment.warranty !== 'N/A' && (
                              <Badge className="bg-emerald-100 text-emerald-800">
                                <Shield className="w-3 h-3 mr-1" />
                                Under Warranty
                              </Badge>
                            )}
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Tooth:</span>
                              <p className="font-medium">{treatment.tooth}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Date:</span>
                              <p className="font-medium">{treatment.date}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Dentist:</span>
                              <p className="font-medium">{treatment.dentist}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Cost:</span>
                              <p className="font-medium">₹{treatment.cost.toLocaleString()}</p>
                            </div>
                          </div>
                          {treatment.notes && (
                            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                              <p className="text-sm text-slate-600">
                                <span className="font-medium">Notes:</span> {treatment.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warranties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Warranties</CardTitle>
                <CardDescription>Digital warranty certificates for your treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatments.filter(t => t.warranty !== 'N/A').map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <Shield className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-lg font-semibold">{treatment.treatmentType} Warranty</h3>
                            <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Treatment:</span>
                              <p className="font-medium">{treatment.treatmentType} - {treatment.tooth}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Warranty Period:</span>
                              <p className="font-medium">{treatment.warranty}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Start Date:</span>
                              <p className="font-medium">{treatment.date}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Expiry Date:</span>
                              <p className="font-medium">{treatment.warrantyExpiry}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-3">
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4 mr-2" />
                              View Certificate
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.purpose}</p>
                          <p className="text-sm text-slate-600">{appointment.date} at {appointment.time} • {appointment.dentist}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}