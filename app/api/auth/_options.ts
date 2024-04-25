import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { log } from "console";
import prisma from "@/app/utils/db";

interface Token {
  // Define the properties of the token object
  // For example:
  access_token: string;
  // Other properties...
}
interface Session {
  // Define the properties of the session object
  // For example:
  userId: string;
  // Other properties...
}

export const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/log-in",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });

        try {
          // Call your API with the provided credentials
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/Authentication/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );
          console.log({ response });

          if (response) {
            const user = await response.json();
            console.log({ user });

            if (user) {
              console.log(user.message);
            } else {
              return Promise.resolve(user);
            }
          } else {
            // Handle authentication failure
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Error authenticating with API:", error);
          return Promise.resolve(null);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  
};
