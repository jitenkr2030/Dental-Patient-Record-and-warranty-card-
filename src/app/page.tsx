'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  QrCode, 
  Shield, 
  Users, 
  FileText, 
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Heart,
  Award,
  Camera,
  Calendar,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Navigation Bar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">DentalPass</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/test">
                <Button variant="ghost">Test Page</Button>
              </Link>
              <Link href="/patient-dashboard">
                <Button variant="ghost">Patient Demo</Button>
              </Link>
              <Link href="/clinic-dashboard">
                <Button variant="ghost">Clinic Demo</Button>
              </Link>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            🦷 Trusted by 500+ Dental Clinics
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            QR Dental Passport & 
            <span className="text-emerald-600"> Warranty Platform</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Transform your dental practice with digital patient records, QR code passports, 
            and treatment warranties. Build patient trust and streamline clinic management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/patient-dashboard">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                View Patient Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/clinic-dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Clinic Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Demo Access */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Explore the Platform</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white text-slate-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-center">Patient Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center mb-4">
                  View your dental passport, treatment history, and warranties
                </p>
                <Link href="/patient-dashboard" className="block">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Try Patient Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white text-slate-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-center">Clinic Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center mb-4">
                  Manage patients, appointments, treatments, and billing
                </p>
                <Link href="/clinic-dashboard" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Try Clinic Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white text-slate-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-center">QR Scanner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center mb-4">
                  Scan patient QR codes to instantly access dental records
                </p>
                <Link href="/qr-scanner" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Try QR Scanner
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-slate-400">Dental Clinics</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-slate-400">Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100K+</div>
              <div className="text-slate-400">Treatments</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Platform Features
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to run a modern dental practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Users, 
                title: "Patient Management", 
                desc: "Complete patient database with medical history",
                href: "/clinic-dashboard"
              },
              { 
                icon: QrCode, 
                title: "QR Digital Passports", 
                desc: "Generate unique QR codes for each patient",
                href: "/qr-scanner"
              },
              { 
                icon: Shield, 
                title: "Warranty System", 
                desc: "Digital warranty certificates and claims",
                href: "/warranty-system"
              },
              { 
                icon: Calendar, 
                title: "Appointment Booking", 
                desc: "Online appointment scheduling system",
                href: "/appointment-billing"
              },
              { 
                icon: Camera, 
                title: "X-Ray Storage", 
                desc: "Secure cloud storage for dental X-rays",
                href: "/xray-management"
              },
              { 
                icon: FileText, 
                title: "Billing & Invoicing", 
                desc: "Automated billing and payment processing",
                href: "/appointment-billing"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} href={feature.href}>
                  <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <CardTitle className="text-center">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-center">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DentalPass</span>
          </div>
          <p className="text-slate-400 mb-4">
            Your trusted partner for digital dental records and warranty management.
          </p>
          <p className="text-slate-500 text-sm">
            &copy; 2024 DentalPass. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}