import { NextAuthOptions, getServerSession } from "next-auth";
import { cookies } from "next/headers";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    // signOut: "/sign-out",
    // error: "/sign-in/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          throw new Error("Provided Credentials are invalid");
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token = user as unknown as { [key: string]: any };
      console.log("token", token);
      // console.log("user", user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...token };
      return session;
    },

    redirect() {
      return `${process.env.NEXTAUTHOKREDIRECT}`;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
