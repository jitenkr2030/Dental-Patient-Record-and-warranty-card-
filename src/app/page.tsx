'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  QrCode, 
  Shield, 
  Users, 
  FileText, 
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Heart,
  Award,
  Camera,
  Calendar,
  ArrowRight,
  LogIn,
  LogOut,
  User
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()

  const handleSignIn = () => {
    signIn('credentials', {
      email: 'demo@smiledental.com',
      password: 'DL2024001',
      redirect: false
    })
  }

  const handleSignOut = () => {
    signOut({ redirect: false })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
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
          
          {status === 'authenticated' ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <User className="w-5 h-5 text-slate-600" />
                <span className="text-slate-900">Welcome, {session.user?.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/clinic-dashboard">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8" onClick={handleSignOut}>
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/clinic-dashboard">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                  View Clinic Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={handleSignIn}>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </div>
          )}
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

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600">
              Choose the perfect plan for your dental clinic
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "₹999",
                period: "/month",
                features: ["Up to 100 patients", "Basic QR generation", "Treatment records", "Email support"],
                color: "slate"
              },
              {
                name: "Premium",
                price: "₹1,999",
                period: "/month",
                features: ["Up to 500 patients", "Advanced QR features", "Warranty system", "X-ray storage", "Priority support"],
                color: "emerald",
                popular: true
              },
              {
                name: "Enterprise",
                price: "₹2,999",
                period: "/month",
                features: ["Unlimited patients", "All features", "API access", "Custom branding", "Dedicated support"],
                color: "slate"
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-emerald-500 shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-slate-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${plan.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Dental Practice?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join 500+ clinics already using DentalPass for better patient care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {status === 'authenticated' ? (
              <Link href="/clinic-dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8" onClick={handleSignIn}>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Get Started
              </Button>
            )}
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-emerald-600">
              Schedule Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DentalPass</span>
              </div>
              <p className="text-slate-400">
                Your trusted partner for digital dental records and warranty management.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/patient-dashboard" className="hover:text-white">Patient Dashboard</Link></li>
                <li><Link href="/clinic-dashboard" className="hover:text-white">Clinic Dashboard</Link></li>
                <li><Link href="/qr-scanner" className="hover:text-white">QR Scanner</Link></li>
                <li><Link href="/warranty-system" className="hover:text-white">Warranty System</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/appointment-billing" className="hover:text-white">Appointments</Link></li>
                <li><Link href="/xray-management" className="hover:text-white">X-Ray Storage</Link></li>
                <li><Link href="/appointment-billing" className="hover:text-white">Billing</Link></li>
                <li><Link href="/warranty-system" className="hover:text-white">Claims</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@dentalpass.in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 DentalPass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}