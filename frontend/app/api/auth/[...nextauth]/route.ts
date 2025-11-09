import axios from "axios";
import NextAuth, { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const registerGoogle = async (user: User) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  const userData = {
    profilePhoto: user.image,
    fullname: user.name,
    email: user.email,
    role: "candidate",
    provider: "Google",
  };

  try {
    const res = await axios.post(apiUrl, userData);
    return res.data.user;
  } catch (err) {
    console.error("Backend registration error:", err);
  }
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        const registeredUser = await registerGoogle(user);
        if (registeredUser) token = registeredUser;
      }
      return token;
    },

    async session({ session, token }): Promise<Session> {
      session.user = token;
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development" ? true : false,
});

export { handler as GET, handler as POST };
