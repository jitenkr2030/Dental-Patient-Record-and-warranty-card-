'use client'

import Navigation from '@/components/Navigation'
import { useState } from 'react'
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
  Activity
} from 'lucide-react'

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock patient data
  const patient = {
    name: "Rahul Sharma",
    patientId: "DP2024001",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    bloodGroup: "O+",
    allergies: "Penicillin",
    emergencyContact: "+91 98765 43211",
    clinic: "Smile Dental Care",
    address: "Mumbai, Maharashtra"
  }

  const treatments = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Root Canal",
      tooth: "Tooth 16",
      dentist: "Dr. Priya Patel",
      cost: 8000,
      warranty: "3 Years",
      warrantyExpiry: "2027-01-15",
      status: "completed"
    },
    {
      id: 2,
      date: "2023-12-20",
      type: "Crown",
      tooth: "Tooth 26",
      dentist: "Dr. Amit Kumar",
      cost: 12000,
      warranty: "5 Years",
      warrantyExpiry: "2028-12-20",
      status: "completed"
    },
    {
      id: 3,
      date: "2023-11-10",
      type: "Cleaning",
      tooth: "All",
      dentist: "Dr. Priya Patel",
      cost: 1500,
      warranty: "N/A",
      warrantyExpiry: "N/A",
      status: "completed"
    }
  ]

  const appointments = [
    {
      id: 1,
      date: "2024-02-15",
      time: "10:00 AM",
      dentist: "Dr. Priya Patel",
      purpose: "Regular Checkup",
      status: "scheduled"
    },
    {
      id: 2,
      date: "2024-03-20",
      time: "2:30 PM",
      dentist: "Dr. Amit Kumar",
      purpose: "Follow-up",
      status: "scheduled"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
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
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
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
                      <p className="font-medium">{patient.clinic}</p>
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
                  <div className="text-2xl font-bold">{treatments.filter(t => t.warranty !== "N/A").length}</div>
                  <p className="text-sm text-slate-600">Active Warranties</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{appointments.filter(a => a.status === "scheduled").length}</div>
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
                          <p className="font-medium">{treatment.type}</p>
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
                {/* QR Code Placeholder */}
                <div className="w-64 h-64 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">QR Code for {patient.patientId}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Card
                  </Button>
                  <Button variant="outline">
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
            <Card>
              <CardHeader>
                <CardTitle>Treatment History</CardTitle>
                <CardDescription>Complete record of all your dental treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatments.map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{treatment.type}</h3>
                            <Badge variant="outline">{treatment.status}</Badge>
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
                          {treatment.warranty !== "N/A" && (
                            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-900">
                                  Warranty: {treatment.warranty} (Expires: {treatment.warrantyExpiry})
                                </span>
                              </div>
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
                  {treatments.filter(t => t.warranty !== "N/A").map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <Shield className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-lg font-semibold">{treatment.type} Warranty</h3>
                            <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Treatment:</span>
                              <p className="font-medium">{treatment.type} - {treatment.tooth}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled dental visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.purpose}</p>
                          <p className="text-sm text-slate-600">
                            {appointment.date} at {appointment.time} • {appointment.dentist}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book New Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}