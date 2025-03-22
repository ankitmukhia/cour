import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({ 
	providers: [] 
})

export { handler as GET, handler as POST }
