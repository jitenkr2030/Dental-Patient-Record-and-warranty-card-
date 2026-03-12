import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    {
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user is clinic (for now, we'll use a simple check)
        const clinic = await db.clinic.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!clinic) {
          return null
        }

        // In production, you'd hash and compare passwords
        // For now, we'll use a simple verification
        const isValidPassword = credentials.password === clinic.licenseNo // Temporary: use licenseNo as password
        
        if (!isValidPassword) {
          return null
        }

        return {
          id: clinic.id,
          email: clinic.email,
          name: clinic.name,
          role: "clinic",
        }
      }
    }
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.clinicId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.clinicId = token.clinicId
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }