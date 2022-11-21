import { randomBytes, randomUUID } from "crypto";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      // @ts-ignore
      async authorize(credentials, req) {
        const user = {
          id: 1,
          name: "MD Rashid Hussain",
          email: "m3rashid.hussain@gmail.com",
          username: process.env.NEXTAUTH_USERNAME,
          password: process.env.NEXTAUTH_PASSWORD,
        };

        if (!credentials) return null;

        if (
          credentials.username === user.username &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default nextAuth(authOptions);
