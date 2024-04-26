import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { log } from "console";
// import prisma from "@/app/utils/db";

interface Token {
  // Define the properties of the token object
  // For example:
  access_token: string;
  // Other properties...
}
interface Session {
  // Define the properties of the session object
  // For example:
  token: string;
  // Other properties...
}

export const authOptions: any = {
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/log-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        try {
            // Call your API to validate credentials
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });
            
            if (response) {
                const user = await response.json();
                console.log({user});
                
                if(user?.statusCode){
                  console.log(user.message);
                }else{
                  return Promise.resolve(user);
                }
               
              } else {
                // Handle authentication failure
                return Promise.resolve(null);
              }
          } catch (error) {
            console.error('Authentication error:', error);
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
    
  ],
  callbacks: {
    async jwt({ token, user }:{token: any, user: any}) {

      if (user) {
        return {
          ...token,
          token: user.access_token,
        };
      }
      return token;
    },
    async session({ session, token }:{token: any, session: any}) {
      console.log({token});
      
      return {
        ...session,
        token: token.token
      };
    },
  },
};
