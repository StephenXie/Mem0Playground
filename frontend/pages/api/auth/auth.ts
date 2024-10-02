import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id: string
    }
  }
}
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google-login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              user_id: user.id,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to authenticate with backend');
          }

          const data = await response.json();
          // You can store additional user data in the token or session here if needed
          return true;
        } catch (error) {
          console.error('Authentication error:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      // Add user_id to the session
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
});

