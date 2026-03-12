'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Plus,
  Search,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tooth,
  Award,
  FileCheck,
  Send,
  MessageSquare
} from 'lucide-react'

export default function WarrantySystem() {
  const [activeTab, setActiveTab] = useState('warranties')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock warranty data
  const warranties = [
    {
      id: 1,
      warrantyId: "DW-2024-001",
      patientName: "Rahul Sharma",
      patientId: "DP2024001",
      treatmentType: "Root Canal",
      tooth: "Tooth 16",
      dentist: "Dr. Priya Patel",
      clinic: "Smile Dental Care",
      warrantyPeriod: "3 Years",
      startDate: "2024-01-15",
      endDate: "2027-01-15",
      status: "active",
      certificateUrl: "/certificates/DW-2024-001.pdf",
      treatmentCost: 8000,
      generatedDate: "2024-01-15"
    },
    {
      id: 2,
      warrantyId: "DW-2024-002",
      patientName: "Priya Nair",
      patientId: "DP2024002",
      treatmentType: "Crown",
      tooth: "Tooth 26",
      dentist: "Dr. Amit Kumar",
      clinic: "Smile Dental Care",
      warrantyPeriod: "5 Years",
      startDate: "2024-01-20",
      endDate: "2029-01-20",
      status: "active",
      certificateUrl: "/certificates/DW-2024-002.pdf",
      treatmentCost: 12000,
      generatedDate: "2024-01-20"
    },
    {
      id: 3,
      warrantyId: "DW-2023-003",
      patientName: "Amit Kumar",
      patientId: "DP2024003",
      treatmentType: "Implant",
      tooth: "Tooth 11",
      dentist: "Dr. Priya Patel",
      clinic: "Smile Dental Care",
      warrantyPeriod: "10 Years",
      startDate: "2023-12-10",
      endDate: "2033-12-10",
      status: "active",
      certificateUrl: "/certificates/DW-2023-003.pdf",
      treatmentCost: 25000,
      generatedDate: "2023-12-10"
    }
  ]

  const claims = [
    {
      id: 1,
      claimId: "CL-2024-001",
      warrantyId: "DW-2024-001",
      patientName: "Rahul Sharma",
      patientId: "DP2024001",
      treatmentType: "Root Canal",
      issue: "Experiencing sensitivity in treated tooth",
      description: "Patient reports mild sensitivity when consuming cold foods and drinks. No pain otherwise.",
      status: "pending",
      claimedAt: "2024-02-10",
      resolvedAt: null,
      priority: "medium",
      assignedTo: "Dr. Priya Patel",
      clinic: "Smile Dental Care"
    },
    {
      id: 2,
      claimId: "CL-2024-002",
      warrantyId: "DW-2023-003",
      patientName: "Amit Kumar",
      patientId: "DP2024003",
      treatmentType: "Implant",
      issue: "Implant crown feels loose",
      description: "Patient reports that the crown on implant feels slightly loose when chewing hard foods.",
      status: "approved",
      claimedAt: "2024-02-05",
      resolvedAt: "2024-02-08",
      priority: "high",
      assignedTo: "Dr. Amit Kumar",
      resolution: "Crown recemented successfully. No issues with implant itself.",
      clinic: "Smile Dental Care"
    },
    {
      id: 3,
      claimId: "CL-2024-003",
      warrantyId: "DW-2024-002",
      patientName: "Priya Nair",
      patientId: "DP2024002",
      treatmentType: "Crown",
      issue: "Minor discoloration noticed",
      description: "Patient notices slight discoloration at the gum line of the crown.",
      status: "rejected",
      claimedAt: "2024-02-01",
      resolvedAt: "2024-02-03",
      priority: "low",
      assignedTo: "Dr. Amit Kumar",
      resolution: "Normal staining due to coffee consumption. Advised proper cleaning.",
      clinic: "Smile Dental Care"
    }
  ]

  const warrantyTemplates = [
    {
      id: 1,
      name: "Standard Warranty",
      treatmentTypes: ["Root Canal", "Filling", "Cleaning"],
      defaultPeriod: "2 Years",
      description: "Standard warranty for basic dental treatments"
    },
    {
      id: 2,
      name: "Premium Warranty",
      treatmentTypes: ["Crown", "Bridge", "Veneer"],
      defaultPeriod: "5 Years",
      description: "Extended warranty for restorative treatments"
    },
    {
      id: 3,
      name: "Lifetime Warranty",
      treatmentTypes: ["Implant"],
      defaultPeriod: "10 Years",
      description: "Comprehensive warranty for implant treatments"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800'
      case 'expired': return 'bg-slate-100 text-slate-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-emerald-100 text-emerald-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Warranty Management System</h1>
                <p className="text-sm text-slate-600">Manage treatment warranties and claims</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Generate Warranty
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Warranties</p>
                  <p className="text-2xl font-bold">{warranties.filter(w => w.status === 'active').length}</p>
                </div>
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending Claims</p>
                  <p className="text-2xl font-bold">{claims.filter(c => c.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Approved Claims</p>
                  <p className="text-2xl font-bold">{claims.filter(c => c.status === 'approved').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Value</p>
                  <p className="text-2xl font-bold">₹{warranties.reduce((acc, w) => acc + w.treatmentCost, 0).toLocaleString()}</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="warranties">Warranties</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="warranties" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search warranties..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                New Warranty
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Warranty ID</th>
                        <th className="text-left py-3 px-4">Patient</th>
                        <th className="text-left py-3 px-4">Treatment</th>
                        <th className="text-left py-3 px-4">Period</th>
                        <th className="text-left py-3 px-4">Valid Until</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warranties.map((warranty) => (
                        <tr key={warranty.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{warranty.warrantyId}</p>
                              <p className="text-sm text-slate-600">{warranty.generatedDate}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{warranty.patientName}</p>
                              <p className="text-sm text-slate-600">{warranty.patientId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{warranty.treatmentType}</p>
                              <p className="text-sm text-slate-600">{warranty.tooth}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{warranty.warrantyPeriod}</td>
                          <td className="py-3 px-4">{warranty.endDate}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(warranty.status)}>
                              {warranty.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="w-4 h-4" />
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

          <TabsContent value="claims" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search claims..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                New Claim
              </Button>
            </div>

            <div className="grid gap-4">
              {claims.map((claim) => (
                <Card key={claim.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <FileCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{claim.claimId}</CardTitle>
                          <CardDescription>
                            {claim.patientName} • {claim.treatmentType}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(claim.priority)}>
                          {claim.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(claim.status)}>
                          {claim.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">Issue:</h4>
                        <p className="text-slate-600">{claim.issue}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">Description:</h4>
                        <p className="text-slate-600">{claim.description}</p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Claimed:</span>
                          <p className="font-medium">{claim.claimedAt}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Assigned to:</span>
                          <p className="font-medium">{claim.assignedTo}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Clinic:</span>
                          <p className="font-medium">{claim.clinic}</p>
                        </div>
                      </div>
                      {claim.resolution && (
                        <div className="p-3 bg-emerald-50 rounded-lg">
                          <h4 className="font-medium text-emerald-900 mb-1">Resolution:</h4>
                          <p className="text-emerald-800">{claim.resolution}</p>
                        </div>
                      )}
                      <div className="flex space-x-2 pt-2">
                        {claim.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Patient
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Warranty Templates</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {warrantyTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">
                        {template.defaultPeriod}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-2">Applicable for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {template.treatmentTypes.map((type, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Warranty Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Claims by Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Pending</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{width: '33%'}}></div>
                        </div>
                        <span className="text-sm font-medium">{claims.filter(c => c.status === 'pending').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Approved</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full" style={{width: '33%'}}></div>
                        </div>
                        <span className="text-sm font-medium">{claims.filter(c => c.status === 'approved').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Rejected</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{width: '34%'}}></div>
                        </div>
                        <span className="text-sm font-medium">{claims.filter(c => c.status === 'rejected').length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warranty Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Root Canal</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full" style={{width: '33%'}}></div>
                        </div>
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Crown</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '33%'}}></div>
                        </div>
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Implant</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: '34%'}}></div>
                        </div>
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New warranty generated</p>
                      <p className="text-xs text-slate-600">Root Canal for Rahul Sharma • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FileCheck className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New claim submitted</p>
                      <p className="text-xs text-slate-600">Implant issue for Amit Kumar • 5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Claim approved</p>
                      <p className="text-xs text-slate-600">Crown recemented for Amit Kumar • 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}