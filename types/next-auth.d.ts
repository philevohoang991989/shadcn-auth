import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            access_token?: string;
            email?: string;
            image?: string;
            name?: string;
        }
    }
}