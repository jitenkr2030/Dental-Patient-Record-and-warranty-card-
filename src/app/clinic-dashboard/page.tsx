'use client'

import Navigation from '@/components/Navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  QrCode,
  Calendar,
  FileText,
  Shield,
  Camera,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Activity,
  Heart,
  UserPlus
} from 'lucide-react'

export default function ClinicDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock clinic data
  const clinic = {
    name: "Smile Dental Care",
    email: "info@smiledental.com",
    phone: "+91 22 2345 6789",
    address: "123, MG Road, Mumbai, Maharashtra 400001",
    licenseNo: "MHC-2024-001",
    subscription: "Premium"
  }

  const patients = [
    {
      id: 1,
      patientId: "DP2024001",
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul.sharma@email.com",
      lastVisit: "2024-01-15",
      totalTreatments: 3,
      activeWarranties: 2,
      status: "active"
    },
    {
      id: 2,
      patientId: "DP2024002",
      name: "Priya Nair",
      phone: "+91 98765 43211",
      email: "priya.nair@email.com",
      lastVisit: "2024-01-20",
      totalTreatments: 5,
      activeWarranties: 3,
      status: "active"
    },
    {
      id: 3,
      patientId: "DP2024003",
      name: "Amit Kumar",
      phone: "+91 98765 43212",
      email: "amit.kumar@email.com",
      lastVisit: "2023-12-10",
      totalTreatments: 2,
      activeWarranties: 1,
      status: "inactive"
    }
  ]

  const appointments = [
    {
      id: 1,
      patientName: "Rahul Sharma",
      patientId: "DP2024001",
      date: "2024-02-15",
      time: "10:00 AM",
      dentist: "Dr. Priya Patel",
      purpose: "Regular Checkup",
      status: "scheduled",
      type: "checkup"
    },
    {
      id: 2,
      patientName: "Priya Nair",
      patientId: "DP2024002",
      date: "2024-02-15",
      time: "11:30 AM",
      dentist: "Dr. Amit Kumar",
      purpose: "Root Canal",
      status: "scheduled",
      type: "treatment"
    },
    {
      id: 3,
      patientName: "Amit Kumar",
      patientId: "DP2024003",
      date: "2024-02-16",
      time: "2:00 PM",
      dentist: "Dr. Priya Patel",
      purpose: "Cleaning",
      status: "scheduled",
      type: "treatment"
    }
  ]

  const treatments = [
    {
      id: 1,
      patientName: "Rahul Sharma",
      patientId: "DP2024001",
      type: "Root Canal",
      tooth: "Tooth 16",
      dentist: "Dr. Priya Patel",
      date: "2024-01-15",
      cost: 8000,
      warranty: "3 Years",
      status: "completed"
    },
    {
      id: 2,
      patientName: "Priya Nair",
      patientId: "DP2024002",
      type: "Crown",
      tooth: "Tooth 26",
      dentist: "Dr. Amit Kumar",
      date: "2024-01-20",
      cost: 12000,
      warranty: "5 Years",
      status: "completed"
    }
  ]

  const dentists = [
    {
      id: 1,
      name: "Dr. Priya Patel",
      email: "priya.patel@smiledental.com",
      phone: "+91 98765 43213",
      licenseNo: "MCD-2020-123",
      specialization: "Endodontist",
      patients: 45,
      experience: "8 years"
    },
    {
      id: 2,
      name: "Dr. Amit Kumar",
      email: "amit.kumar@smiledental.com",
      phone: "+91 98765 43214",
      licenseNo: "MCD-2018-456",
      specialization: "Prosthodontist",
      patients: 38,
      experience: "10 years"
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
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Clinic Dashboard</h1>
                <p className="text-sm text-slate-600">{clinic.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-emerald-100 text-emerald-800">
                {clinic.subscription} Plan
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="warranties">Warranties</TabsTrigger>
            <TabsTrigger value="dentists">Dentists</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Total Patients</p>
                      <p className="text-2xl font-bold">{patients.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Today's Appointments</p>
                      <p className="text-2xl font-bold">{appointments.filter(a => a.date === "2024-02-15").length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Active Warranties</p>
                      <p className="text-2xl font-bold">{patients.reduce((acc, p) => acc + p.activeWarranties, 0)}</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold">₹45K</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>Today's scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {appointments.filter(a => a.date === "2024-02-15").slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{appointment.patientName}</p>
                            <p className="text-xs text-slate-600">{appointment.time} • {appointment.purpose}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Treatments</CardTitle>
                  <CardDescription>Latest completed treatments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {treatments.slice(0, 3).map((treatment) => (
                      <div key={treatment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Heart className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{treatment.type}</p>
                            <p className="text-xs text-slate-600">{treatment.patientName} • {treatment.date}</p>
                          </div>
                        </div>
                        <p className="font-medium text-sm">₹{treatment.cost.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Patient</th>
                        <th className="text-left py-3 px-4">Contact</th>
                        <th className="text-left py-3 px-4">Last Visit</th>
                        <th className="text-left py-3 px-4">Treatments</th>
                        <th className="text-left py-3 px-4">Warranties</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-slate-600">{patient.patientId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm">{patient.phone}</p>
                              <p className="text-sm text-slate-600">{patient.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{patient.lastVisit}</td>
                          <td className="py-3 px-4">{patient.totalTreatments}</td>
                          <td className="py-3 px-4">{patient.activeWarranties}</td>
                          <td className="py-3 px-4">
                            <Badge className={patient.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}>
                              {patient.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <QrCode className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Appointment Schedule</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={appointment.type === 'checkup' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}>
                        {appointment.type}
                      </Badge>
                      <Badge variant="outline">{appointment.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-slate-600">{appointment.patientId}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>{appointment.dentist}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium">Purpose: {appointment.purpose}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Check In
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Treatment Records</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Treatment
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Patient</th>
                        <th className="text-left py-3 px-4">Treatment</th>
                        <th className="text-left py-3 px-4">Dentist</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Cost</th>
                        <th className="text-left py-3 px-4">Warranty</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treatments.map((treatment) => (
                        <tr key={treatment.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{treatment.patientName}</p>
                              <p className="text-sm text-slate-600">{treatment.patientId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{treatment.type}</p>
                              <p className="text-sm text-slate-600">{treatment.tooth}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{treatment.dentist}</td>
                          <td className="py-3 px-4">{treatment.date}</td>
                          <td className="py-3 px-4">₹{treatment.cost.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-emerald-100 text-emerald-800">
                              {treatment.warranty}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Shield className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warranties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Warranty Management</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Generate Warranty
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {treatments.filter(t => t.warranty !== "N/A").map((treatment) => (
                <Card key={treatment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{treatment.type} Warranty</CardTitle>
                      <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Patient:</span>
                          <p className="font-medium">{treatment.patientName}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Treatment:</span>
                          <p className="font-medium">{treatment.tooth}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Period:</span>
                          <p className="font-medium">{treatment.warranty}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Start Date:</span>
                          <p className="font-medium">{treatment.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dentists" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dentists</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Dentist
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {dentists.map((dentist) => (
                <Card key={dentist.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">{dentist.name}</p>
                        <p className="text-sm text-slate-600">{dentist.specialization}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">License:</span>
                          <p className="font-medium">{dentist.licenseNo}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Experience:</span>
                          <p className="font-medium">{dentist.experience}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Patients:</span>
                          <p className="font-medium">{dentist.patients}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Email:</span>
                          <p className="font-medium text-xs">{dentist.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}