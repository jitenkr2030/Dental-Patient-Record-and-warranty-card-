'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  Receipt,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react'

export default function AppointmentBilling() {
  const [activeTab, setActiveTab] = useState('appointments')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState('')

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      appointmentId: "APT-2024-001",
      patientName: "Rahul Sharma",
      patientId: "DP2024001",
      phone: "+91 98765 43210",
      email: "rahul.sharma@email.com",
      dentist: "Dr. Priya Patel",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: 45,
      purpose: "Regular Checkup",
      type: "checkup",
      status: "scheduled",
      notes: "Patient complains of mild sensitivity in upper right quadrant",
      clinic: "Smile Dental Care",
      reminderSent: true,
      cost: 500
    },
    {
      id: 2,
      appointmentId: "APT-2024-002",
      patientName: "Priya Nair",
      patientId: "DP2024002",
      phone: "+91 98765 43211",
      email: "priya.nair@email.com",
      dentist: "Dr. Amit Kumar",
      date: "2024-02-15",
      time: "11:30 AM",
      duration: 60,
      purpose: "Root Canal Treatment",
      type: "treatment",
      status: "confirmed",
      notes: "Follow-up appointment for root canal completion",
      clinic: "Smile Dental Care",
      reminderSent: true,
      cost: 3000
    },
    {
      id: 3,
      appointmentId: "APT-2024-003",
      patientName: "Amit Kumar",
      patientId: "DP2024003",
      phone: "+91 98765 43212",
      email: "amit.kumar@email.com",
      dentist: "Dr. Priya Patel",
      date: "2024-02-16",
      time: "2:00 PM",
      duration: 30,
      purpose: "Cleaning and Polishing",
      type: "treatment",
      status: "scheduled",
      notes: "Routine cleaning appointment",
      clinic: "Smile Dental Care",
      reminderSent: false,
      cost: 1500
    }
  ]

  // Mock billing data
  const invoices = [
    {
      id: 1,
      invoiceId: "INV-2024-001",
      appointmentId: "APT-2024-001",
      patientName: "Rahul Sharma",
      patientId: "DP2024001",
      date: "2024-02-15",
      dueDate: "2024-02-22",
      status: "paid",
      subtotal: 500,
      tax: 90,
      total: 590,
      paymentMethod: "Credit Card",
      paidDate: "2024-02-15",
      items: [
        { description: "Regular Checkup", quantity: 1, rate: 500, amount: 500 }
      ]
    },
    {
      id: 2,
      invoiceId: "INV-2024-002",
      appointmentId: "APT-2024-002",
      patientName: "Priya Nair",
      patientId: "DP2024002",
      date: "2024-02-15",
      dueDate: "2024-02-22",
      status: "pending",
      subtotal: 3000,
      tax: 540,
      total: 3540,
      paymentMethod: "Pending",
      paidDate: null,
      items: [
        { description: "Root Canal Treatment", quantity: 1, rate: 3000, amount: 3000 }
      ]
    },
    {
      id: 3,
      invoiceId: "INV-2024-003",
      patientName: "Amit Kumar",
      patientId: "DP2024003",
      appointmentId: "APT-2024-003",
      date: "2024-02-10",
      dueDate: "2024-02-17",
      status: "overdue",
      subtotal: 1500,
      tax: 270,
      total: 1770,
      paymentMethod: "Pending",
      paidDate: null,
      items: [
        { description: "Cleaning and Polishing", quantity: 1, rate: 1500, amount: 1500 }
      ]
    }
  ]

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ]

  const dentists = [
    { id: 1, name: "Dr. Priya Patel", specialization: "Endodontist", available: true },
    { id: 2, name: "Dr. Amit Kumar", specialization: "Prosthodontist", available: true },
    { id: 3, name: "Dr. Sarah Johnson", specialization: "Orthodontist", available: false }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-emerald-100 text-emerald-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'paid': return 'bg-emerald-100 text-emerald-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getTypeColor = (type) => {
    return type === 'checkup' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Appointment & Billing System</h1>
                <p className="text-sm text-slate-600">Manage appointments and billing efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
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
                  <p className="text-sm text-slate-600">Pending Invoices</p>
                  <p className="text-2xl font-bold">{invoices.filter(i => i.status === 'pending').length}</p>
                </div>
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Today's Revenue</p>
                  <p className="text-2xl font-bold">₹{invoices.filter(i => i.date === "2024-02-15").reduce((acc, i) => acc + i.total, 0).toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Overdue Amount</p>
                  <p className="text-2xl font-bold">₹{invoices.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.total, 0).toLocaleString()}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
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
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>

            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                            <p className="text-sm text-slate-600">{appointment.patientId} • {appointment.phone}</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Calendar className="w-4 h-4 text-slate-600" />
                              <span>{appointment.date} at {appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Clock className="w-4 h-4 text-slate-600" />
                              <span>{appointment.duration} minutes</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <User className="w-4 h-4 text-slate-600" />
                              <span>{appointment.dentist}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm text-slate-600">Purpose:</span>
                              <p className="font-medium">{appointment.purpose}</p>
                            </div>
                            <div>
                              <span className="text-sm text-slate-600">Notes:</span>
                              <p className="text-sm">{appointment.notes}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <Badge className={getTypeColor(appointment.type)}>
                            {appointment.type}
                          </Badge>
                          {appointment.reminderSent && (
                            <Badge variant="outline" className="text-xs">
                              <Send className="w-3 h-3 mr-1" />
                              Reminder Sent
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Check In
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Appointment Calendar</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Appointment
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Calendar View */}
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="font-medium p-2">{day}</div>
                    ))}
                    {Array.from({length: 28}, (_, i) => (
                      <div key={i} className={`p-2 border rounded cursor-pointer hover:bg-emerald-50 ${i === 14 ? 'bg-emerald-100 border-emerald-500' : ''}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Slots */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots - {selectedDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-emerald-50 cursor-pointer">
                        <span className="text-sm">{slot}</span>
                        <Badge variant={index < 5 ? "outline" : "secondary"} className="text-xs">
                          {index < 5 ? "Available" : "Booked"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dentist Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Dentist Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {dentists.map((dentist) => (
                    <div key={dentist.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${dentist.available ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                          <span className="font-medium">{dentist.name}</span>
                        </div>
                        <Badge variant={dentist.available ? "outline" : "secondary"} className="text-xs">
                          {dentist.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{dentist.specialization}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="grid gap-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{invoice.invoiceId}</h3>
                            <p className="text-sm text-slate-600">{invoice.patientName} • {invoice.patientId}</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <span className="text-sm text-slate-600">Invoice Date:</span>
                            <p className="font-medium">{invoice.date}</p>
                          </div>
                          <div>
                            <span className="text-sm text-slate-600">Due Date:</span>
                            <p className="font-medium">{invoice.dueDate}</p>
                          </div>
                          <div>
                            <span className="text-sm text-slate-600">Payment Method:</span>
                            <p className="font-medium">{invoice.paymentMethod}</p>
                          </div>
                          <div>
                            <span className="text-sm text-slate-600">Total Amount:</span>
                            <p className="font-bold text-lg">₹{invoice.total.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                          {invoice.paidDate && (
                            <span className="text-sm text-slate-600">Paid on {invoice.paidDate}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        {invoice.status === 'pending' && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">This Month</span>
                      <span className="font-bold">₹45,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Last Month</span>
                      <span className="font-bold">₹38,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Growth</span>
                      <span className="font-bold text-emerald-600">+18.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Credit Card</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Cash</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">UPI</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: '10%'}}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Received</p>
                        <p className="text-xs text-slate-600">Rahul Sharma • Regular Checkup</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹590</p>
                      <p className="text-xs text-slate-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Invoice Generated</p>
                        <p className="text-xs text-slate-600">Priya Nair • Root Canal</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹3,540</p>
                      <p className="text-xs text-slate-600">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Overdue</p>
                        <p className="text-xs text-slate-600">Amit Kumar • Cleaning</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹1,770</p>
                      <p className="text-xs text-slate-600">2 days ago</p>
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