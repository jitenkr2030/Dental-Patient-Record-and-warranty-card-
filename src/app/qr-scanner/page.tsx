'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  QrCode, 
  Camera,
  Search,
  User,
  Calendar,
  FileText,
  Shield,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Heart,
  Activity,
  Download,
  Share2,
  Eye
} from 'lucide-react'

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [patientData, setPatientData] = useState(null)
  const [manualId, setManualId] = useState('')

  // Mock patient data that would come from QR scan
  const mockPatientData = {
    patientId: "DP2024001",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    bloodGroup: "O+",
    allergies: "Penicillin",
    medications: "None",
    emergencyContact: "+91 98765 43211",
    clinic: "Smile Dental Care",
    address: "Mumbai, Maharashtra",
    registeredDate: "2023-01-15"
  }

  const mockTreatments = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Root Canal",
      tooth: "Tooth 16",
      dentist: "Dr. Priya Patel",
      clinic: "Smile Dental Care",
      cost: 8000,
      warranty: "3 Years",
      warrantyExpiry: "2027-01-15",
      status: "completed",
      notes: "Successful root canal treatment with no complications"
    },
    {
      id: 2,
      date: "2023-12-20",
      type: "Crown",
      tooth: "Tooth 26",
      dentist: "Dr. Amit Kumar",
      clinic: "Smile Dental Care",
      cost: 12000,
      warranty: "5 Years",
      warrantyExpiry: "2028-12-20",
      status: "completed",
      notes: "Porcelain crown placed, patient satisfied"
    },
    {
      id: 3,
      date: "2023-11-10",
      type: "Cleaning",
      tooth: "All",
      dentist: "Dr. Priya Patel",
      clinic: "Smile Dental Care",
      cost: 1500,
      warranty: "N/A",
      warrantyExpiry: "N/A",
      status: "completed",
      notes: "Regular cleaning and polishing"
    }
  ]

  const mockWarranties = [
    {
      id: 1,
      treatmentType: "Root Canal",
      tooth: "Tooth 16",
      warrantyPeriod: "3 Years",
      startDate: "2024-01-15",
      endDate: "2027-01-15",
      status: "Active",
      certificateUrl: "/certificates/warranty-001.pdf"
    },
    {
      id: 2,
      treatmentType: "Crown",
      tooth: "Tooth 26",
      warrantyPeriod: "5 Years",
      startDate: "2023-12-20",
      endDate: "2028-12-20",
      status: "Active",
      certificateUrl: "/certificates/warranty-002.pdf"
    }
  ]

  const handleScan = () => {
    setIsScanning(true)
    // Simulate QR scan delay
    setTimeout(() => {
      setPatientData(mockPatientData)
      setIsScanning(false)
    }, 2000)
  }

  const handleManualSearch = () => {
    if (manualId) {
      setPatientData(mockPatientData)
    }
  }

  const resetScanner = () => {
    setPatientData(null)
    setManualId('')
    setIsScanning(false)
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
                <h1 className="text-xl font-bold text-slate-900">QR Scanner</h1>
                <p className="text-sm text-slate-600">Access patient dental records instantly</p>
              </div>
            </div>
            {patientData && (
              <Button variant="outline" onClick={resetScanner}>
                Scan New Patient
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!patientData ? (
          /* Scanner Interface */
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <QrCode className="w-6 h-6 text-emerald-600" />
                  <span>Scan Patient QR Code</span>
                </CardTitle>
                <CardDescription>
                  Scan the patient's dental passport QR code to access their records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Scanner Area */}
                <div className="relative">
                  <div className="w-full h-64 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
                    {isScanning ? (
                      <div className="text-center text-white">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p>Scanning QR Code...</p>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400">
                        <QrCode className="w-16 h-16 mx-auto mb-4" />
                        <p>QR Code Scanner</p>
                      </div>
                    )}
                  </div>
                  {isScanning && (
                    <div className="absolute inset-0 border-2 border-emerald-500 rounded-lg animate-pulse"></div>
                  )}
                </div>

                <Button 
                  onClick={handleScan} 
                  disabled={isScanning}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {isScanning ? 'Scanning...' : 'Start Scanning'}
                </Button>

                {/* Manual Search Option */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-50 px-2 text-slate-600">Or search manually</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Patient ID (e.g., DP2024001)"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                  />
                  <Button onClick={handleManualSearch} variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-900">How to scan:</p>
                      <ul className="text-sm text-blue-800 mt-1 space-y-1">
                        <li>• Position the QR code within the scanner frame</li>
                        <li>• Ensure good lighting for better recognition</li>
                        <li>• Hold steady until scanning completes</li>
                        <li>• Alternatively, enter the Patient ID manually</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Patient Data Display */
          <div className="space-y-6">
            {/* Patient Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{patientData.name}</CardTitle>
                      <CardDescription>Patient ID: {patientData.patientId}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="warranties">Warranties</TabsTrigger>
                <TabsTrigger value="medical">Medical Info</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-slate-600" />
                        <span className="text-sm">{patientData.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-slate-600" />
                        <span className="text-sm">{patientData.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        <span className="text-sm">{patientData.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Heart className="w-4 h-4 text-slate-600" />
                        <span className="text-sm">Blood Group: {patientData.bloodGroup}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Medical Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600">Allergies:</span>
                        <Badge variant="destructive" className="ml-2">{patientData.allergies}</Badge>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Medications:</span>
                        <span className="text-sm ml-2">{patientData.medications}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Emergency Contact:</span>
                        <span className="text-sm ml-2">{patientData.emergencyContact}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Registered:</span>
                        <span className="text-sm ml-2">{patientData.registeredDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{mockTreatments.length}</div>
                      <p className="text-sm text-slate-600">Total Treatments</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{mockWarranties.length}</div>
                      <p className="text-sm text-slate-600">Active Warranties</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">Good</div>
                      <p className="text-sm text-slate-600">Dental Health</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">1M</div>
                      <p className="text-sm text-slate-600">Last Visit</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="treatments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Treatment History</CardTitle>
                    <CardDescription>Complete dental treatment record</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTreatments.map((treatment) => (
                        <div key={treatment.id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold">{treatment.type}</h3>
                                <Badge variant="outline">{treatment.status}</Badge>
                                {treatment.warranty !== "N/A" && (
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
                                  <span className="text-slate-600">Clinic:</span>
                                  <p className="font-medium">{treatment.clinic}</p>
                                </div>
                                <div>
                                  <span className="text-slate-600">Cost:</span>
                                  <p className="font-medium">₹{treatment.cost.toLocaleString()}</p>
                                </div>
                                <div>
                                  <span className="text-slate-600">Warranty:</span>
                                  <p className="font-medium">{treatment.warranty}</p>
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
                    <CardDescription>Digital warranty certificates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWarranties.map((warranty) => (
                        <div key={warranty.id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-4">
                                <Shield className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-semibold">{warranty.treatmentType} Warranty</h3>
                                <Badge className="bg-emerald-100 text-emerald-800">
                                  {warranty.status}
                                </Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-slate-600">Treatment:</span>
                                  <p className="font-medium">{warranty.treatmentType} - {warranty.tooth}</p>
                                </div>
                                <div>
                                  <span className="text-slate-600">Warranty Period:</span>
                                  <p className="font-medium">{warranty.warrantyPeriod}</p>
                                </div>
                                <div>
                                  <span className="text-slate-600">Start Date:</span>
                                  <p className="font-medium">{warranty.startDate}</p>
                                </div>
                                <div>
                                  <span className="text-slate-600">Expiry Date:</span>
                                  <p className="font-medium">{warranty.endDate}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex space-x-3">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4 mr-2" />
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

              <TabsContent value="medical" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600">Full Name:</span>
                        <p className="font-medium">{patientData.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Date of Birth:</span>
                        <p className="font-medium">{patientData.dateOfBirth}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Blood Group:</span>
                        <p className="font-medium">{patientData.bloodGroup}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Home Clinic:</span>
                        <p className="font-medium">{patientData.clinic}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Medical History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600">Allergies:</span>
                        <div className="mt-1">
                          <Badge variant="destructive">{patientData.allergies}</Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Current Medications:</span>
                        <p className="font-medium">{patientData.medications}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Emergency Contact:</span>
                        <p className="font-medium">{patientData.emergencyContact}</p>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600">Registration Date:</span>
                        <p className="font-medium">{patientData.registeredDate}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Important Medical Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-900">Allergy Alert</p>
                          <p className="text-sm text-red-800 mt-1">
                            Patient has a known allergy to Penicillin. Avoid prescribing penicillin-based antibiotics.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}