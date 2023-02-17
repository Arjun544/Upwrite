import NextAuth from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.user.id = user.id;
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

      return session;
    },
  },
});
