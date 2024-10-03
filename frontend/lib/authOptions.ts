import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account?.provider === "google") {
        try {
            console.log(JSON.stringify({
                access_token: account?.access_token,
                id_token: account?.id_token,
              }))
          const response = await fetch(
            "http://127.0.0.1:8000/api/social/login/google/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: account?.access_token,
                id_token: account?.id_token,
              }),
            }
          );
          const data = await response;
          console.log("data", data);
          // user.access_token = data.access_token;
          return true;
        } catch (e) {
          console.log("error", e);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
    //   console.log("jwt", token, user, account, profile);
      return token;
    },
    async session({ session, user }) {
    //   console.log("session", session, user);
      return session;
    },
  },
};
