import QRCode from 'qrcode'
import { db } from '@/lib/db'

interface QRCodeOptions {
  width?: number
  margin?: number
  color?: {
    dark?: string
    light?: string
  }
}

export class QRCodeGenerator {
  private static defaultOptions: QRCodeOptions = {
    width: 200,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  }

  /**
   * Generate QR code for patient dental passport
   */
  static async generatePatientQR(patientId: string, options?: QRCodeOptions): Promise<string> {
    const opts = { ...this.defaultOptions, ...options }
    
    // Create comprehensive patient data for QR code
    const qrData = {
      type: 'dental-passport',
      patientId,
      url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/qr-scanner?patient=${patientId}`,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }

    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: opts.width,
        margin: opts.margin,
        color: opts.color,
        errorCorrectionLevel: 'M'
      })

      return qrCodeDataURL
    } catch (error) {
      console.error('Error generating QR code:', error)
      throw new Error('Failed to generate QR code')
    }
  }

  /**
   * Generate QR code for warranty certificate
   */
  static async generateWarrantyQR(warrantyId: string, options?: QRCodeOptions): Promise<string> {
    const opts = { ...this.defaultOptions, ...options }
    
    const qrData = {
      type: 'warranty-certificate',
      warrantyId,
      url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/warranty-system?warranty=${warrantyId}`,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }

    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: opts.width,
        margin: opts.margin,
        color: opts.color,
        errorCorrectionLevel: 'H'
      })

      return qrCodeDataURL
    } catch (error) {
      console.error('Error generating warranty QR code:', error)
      throw new Error('Failed to generate warranty QR code')
    }
  }

  /**
   * Generate QR code for appointment
   */
  static async generateAppointmentQR(appointmentId: string, options?: QRCodeOptions): Promise<string> {
    const opts = { ...this.defaultOptions, ...options }
    
    const qrData = {
      type: 'appointment',
      appointmentId,
      url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/appointment-billing?appointment=${appointmentId}`,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }

    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: opts.width,
        margin: opts.margin,
        color: opts.color,
        errorCorrectionLevel: 'M'
      })

      return qrCodeDataURL
    } catch (error) {
      console.error('Error generating appointment QR code:', error)
      throw new Error('Failed to generate appointment QR code')
    }
  }

  /**
   * Validate QR code data
   */
  static validateQRData(data: any): boolean {
    try {
      if (!data.type || !data.timestamp || !data.version) {
        return false
      }

      // Check timestamp (QR codes older than 1 year are invalid)
      const timestamp = new Date(data.timestamp)
      const now = new Date()
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      
      if (timestamp < oneYearAgo) {
        return false
      }

      return true
    } catch (error) {
      console.error('Error validating QR data:', error)
      return false
    }
  }

  /**
   * Create patient with QR code
   */
  static async createPatientWithQR(patientData: any, clinicId: string) {
    const patient = await db.patient.create({
      data: {
        ...patientData,
        clinicId,
        patientId: `DP${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      }
    })

    // Generate QR code for the new patient
    const qrCodeDataURL = await this.generatePatientQR(patient.patientId)

    // In a real implementation, you'd store the QR code URL or file path
    // For now, we'll just return it
    return {
      patient,
      qrCode: qrCodeDataURL
    }
  }
}