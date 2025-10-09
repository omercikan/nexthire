import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async signIn({ user }) {
      if (user) {
        const userData = {
          profilePhoto: user.image,
          fullname: user.name,
          email: user.email,
        };

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;

        try {
          await axios.post(apiUrl, userData);
        } catch (err) {
          console.error("Backend registration error:", err);
        }
      }
      return true;
    },
  },

  debug: true,
});

export { handler as GET, handler as POST };
