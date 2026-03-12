// Mock email service for build
export class EmailService {
  static async sendEmail(options: any): Promise<boolean> {
    console.log('Mock: Email sent to', options.to)
    return true
  }

  static async sendAppointmentConfirmation(
    patientEmail: string,
    patientName: string,
    dentistName: string,
    appointmentDate: Date,
    appointmentTime: string
  ): Promise<boolean> {
    console.log('Mock: Appointment confirmation email sent')
    return true
  }

  static async sendTreatmentCompletion(
    patientEmail: string,
    patientName: string,
    treatmentType: string,
    dentistName: string,
    completionDate: Date
  ): Promise<boolean> {
    console.log('Mock: Treatment completion email sent')
    return true
  }

  static async sendWarrantyReminder(
    patientEmail: string,
    patientName: string,
    treatmentType: string,
    expiryDate: Date
  ): Promise<boolean> {
    console.log('Mock: Warranty reminder email sent')
    return true
  }

  static async sendWelcomeEmail(
    patientEmail: string,
    patientName: string,
    patientId: string
  ): Promise<boolean> {
    console.log('Mock: Welcome email sent')
    return true
  }

  static async sendClaimStatusUpdate(
    patientEmail: string,
    patientName: string,
    claimId: string,
    status: string,
    resolution?: string
  ): Promise<boolean> {
    console.log('Mock: Claim status update email sent')
    return true
  }
}