# 🦷 DentalPass - QR Dental Passport & Warranty Platform

A comprehensive SaaS platform for dental clinics that combines **QR-based patient records** with **digital treatment warranties**. Transform your dental practice with modern technology that builds patient trust and streamlines clinic management.

## 🌟 Features

### 👥 For Patients
- **QR Dental Passport** - Portable dental records accessible via QR code
- **Treatment History** - Complete record of all dental procedures
- **Digital Warranty Certificates** - Valid warranty documentation for treatments
- **Appointment Management** - Easy booking and reminders
- **Progress Tracking** - Monitor dental health over time

### 🏥 For Dental Clinics
- **Patient Management** - Complete patient database with medical history
- **QR Code Generation** - Unique QR codes for each patient
- **Treatment Records** - Detailed treatment history and cost tracking
- **Warranty System** - Digital warranty certificates and claim management
- **Appointment Booking** - Online scheduling with calendar integration
- **X-Ray Storage** - Secure cloud storage for dental radiographs
- **Billing & Invoicing** - Automated billing and payment processing
- **Analytics & Reporting** - Comprehensive business insights

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Bun or npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/Dental-Patient-Record-and-warranty-card-.git
   cd Dental-Patient-Record-and-warranty-card-
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up the database**
   ```bash
   bun run db:push
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Platform Demo

The application includes multiple fully-functional modules:

### 🏠 **Main Landing Page** (`/`)
- Professional hero section with value proposition
- Interactive demo cards for different user types
- Feature showcase and pricing information
- Call-to-action for clinic onboarding

### 👤 **Patient Dashboard** (`/patient-dashboard`)
- Personal profile with medical information
- QR code dental passport display
- Treatment history with warranty details
- Appointment scheduling and management
- Secure access to dental records

### 🏥 **Clinic Dashboard** (`/clinic-dashboard`)
- Patient management with search and filtering
- Appointment calendar with time slot management
- Treatment records and cost tracking
- Dentist and staff management
- Real-time statistics and analytics

### 📱 **QR Scanner** (`/qr-scanner`)
- Simulated QR code scanning interface
- Manual patient search by ID
- Complete patient record viewer
- Medical information with allergy alerts
- Treatment and warranty history

### 🛡️ **Warranty System** (`/warranty-system`)
- Digital warranty certificate generation
- Claim management with status tracking
- Warranty templates for different treatments
- Analytics and reporting dashboard
- Priority-based claim handling

### 📅 **Appointments & Billing** (`/appointment-billing`)
- Complete appointment booking system
- Calendar view with dentist availability
- Invoice generation and tracking
- Payment processing interface
- Financial reporting and analytics

### 📸 **X-Ray Management** (`/xray-management`)
- Cloud storage for dental radiographs
- Support for DICOM, JPEG, PNG formats
- Grid and list view options
- Advanced filtering and search
- Upload interface with metadata management

## 🏗️ Technical Architecture

### **Frontend Stack**
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons

### **Backend & Database**
- **Prisma ORM** for database management
- **SQLite** for development (easily switchable to PostgreSQL)
- **Next.js API Routes** for backend functionality
- **Server Actions** for data mutations

### **Key Features**
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Modern UI** - Professional shadcn/ui components
- ✅ **SEO Optimized** - Meta tags and structured data
- ✅ **Performance** - Optimized builds and loading
- ✅ **Accessibility** - WCAG compliant interfaces

## 📊 Database Schema

The platform uses a comprehensive database schema with 8 main models:

```prisma
model Clinic      // Dental clinic information
model Dentist    // Dentist profiles and schedules  
model Patient    // Patient records and medical history
model Treatment  // Dental procedures and costs
model Warranty   // Treatment warranty certificates
model Claim       // Warranty claims and resolution
model Appointment // Patient appointments and scheduling
model XRay        // Dental radiograph storage
```

## 💰 SaaS Pricing Model

### 🥉 **Basic Plan** - ₹999/month
- Up to 100 patients
- Basic QR generation
- Treatment records
- Email support

### 🥈 **Premium Plan** - ₹1,999/month *(Most Popular)*
- Up to 500 patients
- Advanced QR features
- Warranty system
- X-ray storage
- Priority support

### 🥇 **Enterprise Plan** - ₹2,999/month
- Unlimited patients
- All features included
- API access
- Custom branding
- Dedicated support

## 🎯 Business Value

### **For Dental Clinics**
- **Increased Patient Trust** - Digital warranties build confidence
- **Streamlined Operations** - Automated record management
- **Competitive Advantage** - Modern technology attracts patients
- **Additional Revenue** - Warranty fees per treatment (₹50-₹200)

### **Market Opportunity**
- **3 lakh+ dental clinics** in India
- **No standardized record system** in the market
- **Growing digital adoption** in healthcare
- **Untapped niche** for dental-specific SaaS

## 🔧 Development

### **Available Scripts**
```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run db:push      # Push database schema
bun run db:studio    # Open Prisma Studio
```

### **Project Structure**
```
src/
├── app/                    # Next.js App Router pages
│   ├── appointment-billing/
│   ├── clinic-dashboard/
│   ├── patient-dashboard/
│   ├── qr-scanner/
│   ├── warranty-system/
│   └── xray-management/
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── Navigation.tsx    # Main navigation
├── lib/                   # Utility functions
└── prisma/               # Database schema and migrations
```

## 🚀 Deployment

### **Production Build**
```bash
bun run build
```

### **Environment Variables**
Create a `.env.local` file:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Prisma** - Modern database toolkit
- **Lucide** - Beautiful icon library

## 📞 Contact

- **Email**: support@dentalpass.in
- **Phone**: +91 98765 43210
- **Website**: https://dentalpass.in

---

**🦷 DentalPass - Transforming Dental Practice Management, One QR Code at a Time!**